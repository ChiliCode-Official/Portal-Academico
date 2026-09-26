const fs = require('node:fs');
const ts = require('typescript');
const pages = require('../data/course-pages.json');
for (const page of pages) {
  const file = `app${page.href}/page.tsx`;
  let source = fs.readFileSync(file,'utf8');
  const tree = ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const edits=[]; page.links=[];
  function visit(node) {
    if (ts.isJsxElement(node) && ['Link','a'].includes(node.openingElement.tagName.getText(tree))) {
      const attr=node.openingElement.attributes.properties.find(item=>ts.isJsxAttribute(item)&&item.name.text==='href');
      if(attr?.initializer && ts.isStringLiteral(attr.initializer)) {
        const id=`link-${page.links.length+1}`;
        page.links.push({id,href:attr.initializer.text});
        const tag=node.openingElement.tagName;
        edits.push({start:tag.getStart(tree),end:tag.end,text:`CourseLink pageId="${page.id}" linkId="${id}"`});
        const close=node.closingElement.tagName;
        edits.push({start:close.getStart(tree),end:close.end,text:'CourseLink'});
      }
    }
    ts.forEachChild(node,visit);
  }
  visit(tree);
  for(const edit of edits.sort((a,b)=>b.start-a.start)) source=source.slice(0,edit.start)+edit.text+source.slice(edit.end);
  if(edits.length) source=source.replace('CourseText, CourseDocuments','CourseText, CourseLink, CourseDocuments').replace("import Link from 'next/link';",'');
  fs.writeFileSync(file,source);
}
fs.writeFileSync('data/course-pages.json',JSON.stringify(pages,null,2)+'\n');
console.log('Migrated editable course links.');
