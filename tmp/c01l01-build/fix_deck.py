from pathlib import Path
p=Path(__file__).parent/'build_deck.mjs'
s=p.read_text(encoding='utf-8')
s=s.replace("head:{type:'triangle',width:'sm',length:'sm'}","tail:{type:'triangle',width:'sm',length:'sm'}")
s=s.replace("xs[i],300,210,47,26","xs[i],268,210,47,26")
s=s.replace("const result=await finalizePresentation({","process.env.RUNTIME_NODE_MODULES='C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';\nconst result=await finalizePresentation({")
p.write_text(s,encoding='utf-8')
