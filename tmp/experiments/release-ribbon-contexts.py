from pathlib import Path
p = Path('website/src/components/shared/SiteAtmosphere.tsx')
text = p.read_text(encoding='utf-8')
old = '''  return <div ref={host} className="atmosphere-tile" style={{ top, height }}>'''
new = '''  useEffect(() => {
    if (!nearby) return;
    const gl = host.current?.querySelector('canvas')?.getContext('webgl');
    // The original component deletes its resources; release the browser context
    // too when a repeat leaves the viewport, rather than waiting for collection.
    return () => { gl?.getExtension('WEBGL_lose_context')?.loseContext(); };
  }, [nearby]);

  return <div ref={host} className="atmosphere-tile" style={{ top, height }}>'''
assert old in text
p.write_text(text.replace(old,new),encoding='utf-8',newline='\n')
print('Inactive ribbon repeats now release their WebGL contexts.')
