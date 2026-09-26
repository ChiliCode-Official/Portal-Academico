const fs = require('node:fs');
const ts = require('typescript');
const pages = require('../data/course-pages.json');
for(const page of pages) {
  const file = `app${page.href}/page.tsx`;
  let source = fs.readFileSync(file,'utf8');
  if(source.includes('{documents.length}')) {
    source = source.replace('CourseText, CourseDocuments','CourseText, CourseDocuments, CourseDocumentCount');
    source = source.replaceAll('{documents.length}',`<CourseDocumentCount subjectId="${page.subjectId}" category="${page.category}" />`);
  }
  const tree = ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const edits=[];
  function visit(node) {
    if(ts.isImportDeclaration(node) && /components\/(DocumentCard|EmptyState)$|lib\/firebase\/db$/.test(node.moduleSpecifier.text)) { edits.push({start:node.getStart(tree),end:node.end}); return; }
    if(ts.isVariableStatement(node) && node.declarationList.declarations.every(item => ['documents','allDocs','syllabusDoc','reglamentoDoc'].includes(item.name.getText(tree)))) { edits.push({start:node.getStart(tree),end:node.end}); return; }
    ts.forEachChild(node,visit);
  }
  visit(tree);
  for(const edit of edits.sort((a,b)=>b.start-a.start)) source=source.slice(0,edit.start)+source.slice(edit.end);
  fs.writeFileSync(file,source);
}
console.log('Removed static document queries from migrated pages.');
