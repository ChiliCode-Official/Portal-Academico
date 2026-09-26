const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const subjects = ['fisica', 'sensores-e-instrumentacion', 'economia-sostenible', 'pura-energia'];
const categoryFor = slug => ({'bitacora-de-laboratorio':'bitacora','reglamento-de-laboratorio':'reglamento','herramientas-digitales':'herramientas'}[slug] || slug || 'general');
const labels = {general:'General & Syllabus',practicario:'Practicario',bitacora:'Bitácora de Laboratorio',reglamento:'Reglamento de Laboratorio','lectura-obligatoria':'Lectura Obligatoria','lectura-complementaria':'Lectura Complementaria',herramientas:'Herramientas Digitales',rubricas:'Rúbricas',presentaciones:'Presentaciones'};
const catalog = [];
for (const subject of subjects) {
  const root = path.join('app', subject);
  const files = [path.join(root,'page.tsx'), ...fs.readdirSync(root,{withFileTypes:true}).filter(entry=>entry.isDirectory()).map(entry=>path.join(root,entry.name,'page.tsx')).filter(file=>fs.existsSync(file))];
  for (const file of files) {
    const source = fs.readFileSync(file,'utf8');
    if (source.includes('CourseText')) throw new Error('Migration already applied: '+file);
    const tree = ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
    const slug = path.dirname(file) === root ? '' : path.basename(path.dirname(file));
    const category = categoryFor(slug);
    const pageId = `${subject}--${category}`;
    const fields = [];
    const edits = [];
    let hasGrid = false;
    function visit(node) {
      if (ts.isJsxExpression(node) && node.getText(tree).includes('documents.map(') && node.getText(tree).includes('<DocumentCard')) {
        edits.push({start:node.getStart(tree),end:node.end,text:`<CourseDocuments subjectId="${subject}" category="${category}" />`});
        hasGrid = true; return;
      }
      if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(tree)==='DocumentCard') {
        edits.push({start:node.getStart(tree),end:node.end,text:`<CourseDocuments subjectId="${subject}" category="${category}" />`});
        hasGrid = true; return;
      }
      if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(tree)==='EmptyState') {
        edits.push({start:node.getStart(tree),end:node.end,text:`<div className="grid gap-6 md:grid-cols-2"><CourseDocuments subjectId="${subject}" category="${category}" /></div>`});
        hasGrid = true; return;
      }
      if (ts.isJsxText(node) && node.text.trim()) {
        const value = node.text.replace(/\s+/g,' ').trim().replace(/&amp;/g,'&').replace(/&ldquo;|&rdquo;/g,'"').replace(/&apos;|&#39;/g,"'");
        const id = `text-${fields.length+1}`;
        fields.push({id, value});
        edits.push({start:node.pos,end:node.end,text:`<CourseText pageId="${pageId}" fieldId="${id}">${node.text}</CourseText>`});
        return;
      }
      ts.forEachChild(node,visit);
    }
    visit(tree);
    if (!hasGrid) {
      const navEnd = source.indexOf('/>',source.indexOf('<SubjectSubNav'))+2;
      if (navEnd>1) edits.push({start:navEnd,end:navEnd,text:`\n      <div className="grid gap-6 md:grid-cols-2 mb-8"><CourseDocuments subjectId="${subject}" category="${category}" /></div>`});
    }
    let output=source;
    for(const edit of edits.sort((a,b)=>b.start-a.start)) output=output.slice(0,edit.start)+edit.text+output.slice(edit.end);
    output=`import { CourseText, CourseDocuments } from '@/components/CourseContent';\n`+output;
    fs.writeFileSync(file,output);
    catalog.push({id:pageId,subjectId:subject,category,href:`/${subject}${slug?'/'+slug:''}`,label:labels[category]||category,fields});
  }
}
fs.writeFileSync('data/course-pages.json',JSON.stringify(catalog,null,2)+'\n');
console.log(`Migrated ${catalog.length} course pages; ${catalog.reduce((count,page)=>count+page.fields.length,0)} editable texts.`);
