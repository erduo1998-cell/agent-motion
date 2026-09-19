from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
from fontTools.ttLib import TTFont
import json,hashlib
B=Path(__file__).parent
paths={p.parent.name:p for p in (B/'fonts').rglob('*.ttf') if p.name!='BarlowCondensed-Regular.ttf'}
def font(key,size,weight=None):
 f=ImageFont.truetype(str(paths[key]),size)
 if weight is not None:
  try:f.set_variation_by_axes([weight])
  except OSError:pass
 return f
checks=[]
def txt(d,xy,text,key,size,fill,weight=None):
 cm=TTFont(paths[key]).getBestCmap(); missing=[c for c in set(text) if not c.isspace() and ord(c) not in cm];checks.append({'text':text,'font':key,'weight':weight or 400,'missing':missing})
 if missing:raise ValueError((key,missing))
 d.text(xy,text,font=font(key,size,weight),fill=fill,anchor='lt')
def draw(i,bg,ink):
 im=Image.new('RGB',(800,1060),bg);d=ImageDraw.Draw(im)
 txt(d,(45,38),f'0{i} / TYPE STUDY', 'barlowcondensed',25,ink)
 return im,d
cards=[]
im,d=draw(1,'#f5e82d','#141414');txt(d,(42,130),'让复杂','notosanssc',218,'#141414',900);txt(d,(42,365),'变清楚','notosanssc',218,'#141414',900)
d.rectangle((46,625,754,630),fill='#141414');txt(d,(46,660),'MAKE IT CLEAR','bebasneue',122,'#141414');txt(d,(48,900),'01  特黑冲击 / 语义字组叠排','notosanssc',25,'#141414',500);txt(d,(48,942),'Noto Sans SC 900 + Bebas Neue 400','barlowcondensed',25,'#141414');cards.append(im)
im,d=draw(2,'#eee9df','#212120');txt(d,(46,143),'让复杂','notoserifsc',195,'#212120',800);txt(d,(46,390),'变清楚','notoserifsc',195,'#a43127',800)
d.line((50,684,750,684),fill='#a43127',width=3);txt(d,(52,729),'MAKE COMPLEX IDEAS CLEAR','barlowcondensed',44,'#212120',700);txt(d,(52,896),'02  宋黑对比 / 编辑式留白','notosanssc',25,'#212120',500);txt(d,(52,940),'Noto Serif SC 800 + Noto Sans SC 500','barlowcondensed',25,'#212120');cards.append(im)
im,d=draw(3,'#1c44cf','#ffffff');txt(d,(47,132),'让复杂','zcoolqingkehuangyou',256,'#ffffff');txt(d,(47,391),'变清楚','zcoolqingkehuangyou',256,'#ffffff');txt(d,(570,680),'03','barlowcondensed',145,'#a8ee50',700)
txt(d,(50,714),'MAKE IT','barlowcondensed',62,'#ffffff',700);txt(d,(50,777),'CLEAR','barlowcondensed',62,'#ffffff',700);txt(d,(48,908),'03  圆角中文 / 窄体数字','notosanssc',25,'#ffffff',500);txt(d,(48,950),'ZCOOL QingKe HuangYou 400 + Barlow 700','barlowcondensed',25,'#ffffff');cards.append(im)
im,d=draw(4,'#d4ead8','#283e2e');d.ellipse((590,88,735,233),fill='#df8198');txt(d,(53,218),'讓複雜','huninn',194,'#283e2e');txt(d,(53,430),'變清楚','huninn',194,'#283e2e');txt(d,(57,716),'Make it clear.','nunito',84,'#283e2e',800)
txt(d,(52,908),'04  圓體親和 / 留出呼吸','huninn',25,'#283e2e');txt(d,(52,950),'jf open-huninn 2.1 / 400 + Nunito 800','barlowcondensed',25,'#283e2e');cards.append(im)
im,d=draw(5,'#e8dfca','#262320');txt(d,(44,163),'让复杂','mashanzheng',226,'#262320');txt(d,(44,417),'变清楚','mashanzheng',226,'#a93024');txt(d,(52,744),'MAKE IT CLEAR','barlowcondensed',60,'#262320',700)
d.rectangle((671,729,744,802),fill='#a93024');txt(d,(688,746),'字','notoserifsc',40,'#f4ead4',700);txt(d,(52,908),'05  书写情绪 / 笔势与重音','notosanssc',25,'#262320',500);txt(d,(52,950),'Ma Shan Zheng 400 + Noto Sans SC 500','barlowcondensed',25,'#262320');cards.append(im)
im,d=draw(6,'#ef692c','#182943');txt(d,(31,164),'让复杂','smileysans',248,'#182943');txt(d,(31,414),'变清楚','smileysans',248,'#182943');txt(d,(50,730),'MAKE IT CLEAR','barlowcondensed',74,'#fff0cd',700)
txt(d,(50,908),'06  美术字动势 / 原生窄斜体','notosanssc',25,'#182943',500);txt(d,(50,950),'Smiley Sans Oblique 400 + Barlow 700','barlowcondensed',25,'#182943');cards.append(im)
for i,c in enumerate(cards,1):c.save(B/f'specimen-{i:02}.png')
gap=28;sheet=Image.new('RGB',(1628,3236),'#f7f5f0')
for j,c in enumerate(cards):sheet.paste(c,((j%2)*828,(j//2)*1088))
sheet.save(B/'specimen-contact-sheet.png')
(B/'specimen-glyph-check.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2))
manifest=[]
for key,p in paths.items():
 f=TTFont(p);cm=f.getBestCmap(); manifest.append({'familyKey':key,'file':str(p.relative_to(B)),'name':f['name'].getDebugName(1),'fontVersion':f['name'].getDebugName(5),'weightClass':f['OS/2'].usWeightClass,'axes': [{'tag':a.axisTag,'min':a.minValue,'default':a.defaultValue,'max':a.maxValue} for a in f['fvar'].axes] if 'fvar' in f else [],'cmapEntries':len(cm),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'license':str(p.parent.relative_to(B)/'OFL.txt')})
(B/'font-verification.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)); print('PASS',len(checks),'sample runs; all glyphs present')
