from pathlib import Path
from fontTools.ttLib import TTFont
import json,sys
B=Path(__file__).parent
text=sys.argv[1] if len(sys.argv)>1 else '把复杂流程，变成清楚的三个步骤。用Three.js呈现3D空间，支持MiniMagX3。成功率99.9%｜延迟12ms黄金反弹鲍威尔长期通胀可控范围'
report=[]
for p in (B/'fonts').rglob('*.ttf'):
 f=TTFont(p);cm=f.getBestCmap();missing=sorted(set(c for c in text if not c.isspace() and ord(c) not in cm))
 report.append({'file':str(p.relative_to(B)),'input':text,'missing':''.join(missing),'allCovered':not missing})
print(json.dumps(report,ensure_ascii=False,indent=2))
