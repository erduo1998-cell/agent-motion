// Technical screen-position evidence. An intersection is not an aesthetic verdict.
export function projectBounds(THREE,object,camera,width,height){
 object.updateWorldMatrix(true,true);camera.updateWorldMatrix(true,false);
 const box=new THREE.Box3().setFromObject(object);
 if(box.isEmpty())return {usable:false,reason:'empty'};
 const pts=[];
 for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
  const world=new THREE.Vector3(x,y,z);
  if(world.clone().applyMatrix4(camera.matrixWorldInverse).z>=-camera.near)return {usable:false,reason:'near-plane-or-behind'};
  pts.push(world.project(camera));
 }
 if(pts.some(p=>!Number.isFinite(p.x+p.y+p.z)))return {usable:false,reason:'invalid-projection'};
 const xs=pts.map(p=>(p.x+1)*width/2),ys=pts.map(p=>(1-p.y)*height/2);
 const x=Math.min(...xs),y=Math.min(...ys),right=Math.max(...xs),bottom=Math.max(...ys);
 return {usable:true,x,y,width:right-x,height:bottom-y,right,bottom,fullyOutside:right<0||bottom<0||x>width||y>height||pts.every(p=>p.z>1)};
}
export function intersection(a,b){
 if(a.usable===false||b.usable===false)return null;
 const x=Math.max(a.x,b.x),y=Math.max(a.y,b.y),right=Math.min(a.x+a.width,b.x+b.width),bottom=Math.min(a.y+a.height,b.y+b.height);
 return right>x&&bottom>y?{x,y,width:right-x,height:bottom-y,area:(right-x)*(bottom-y)}:null;
}
