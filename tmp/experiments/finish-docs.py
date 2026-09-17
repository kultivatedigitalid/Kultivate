from pathlib import Path
p=Path(__file__).parent/'document-changes.py'
source=p.read_text(encoding='utf-8')
code=source[:source.index('manifest=')]+source[source.index("note('docs/CHANGELOG.md'"):].replace('docs/CHANGELOG.md','CHANGELOG.md')
exec(compile(code,str(p),'exec'))
