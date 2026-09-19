import json,urllib.request,pathlib,hashlib,concurrent.futures
base=pathlib.Path(__file__).parent/'fonts'; base.mkdir(exist_ok=True)
families=['notosanssc','notoserifsc','zcoolqingkehuangyou','mashanzheng','nunito','barlowcondensed','bebasneue','zcoolkuaile']
def one(family):
 url='https://api.github.com/repos/google/fonts/contents/ofl/'+family
 entries=json.load(urllib.request.urlopen(url)); folder=base/family; folder.mkdir(exist_ok=True); rec=[]
 for e in entries:
  if e['name'].endswith('.ttf') or e['name'] in ['OFL.txt','METADATA.pb','DESCRIPTION.en_us.html']:
   if family=='barlowcondensed' and e['name'].endswith('.ttf') and e['name'] not in ['BarlowCondensed-Bold.ttf','BarlowCondensed-Regular.ttf']: continue
   if family=='nunito' and 'Italic' in e['name']: continue
   data=urllib.request.urlopen(e['download_url']).read(); (folder/e['name']).write_bytes(data)
   rec.append({'file':str((folder/e['name']).relative_to(base.parent)),'url':e['download_url'],'sha256':hashlib.sha256(data).hexdigest(),'size':len(data)})
 return {'family':family,'source':url,'files':rec}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: records=list(pool.map(one,families))
(base.parent/'font-assets.json').write_text(json.dumps(records,ensure_ascii=False,indent=2));print([(x['family'],len(x['files'])) for x in records])
