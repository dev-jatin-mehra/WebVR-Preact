const { THREE } = require("aframe");

AFRAME.registerComponent("lowpoly", {
  schema: {
    color: { type: "string", default: "#FFF" },
    nodes: { type: "boolean", default: false },
    opacity: { type: "number", default: 1.0 },
    wireframe: { type: "boolean", default: false },
  },

  init:function(){
    const obj = this.el.getObject3D('mesh')
    const scene = document.querySelector('a-scene').object3D
    obj.material = new THREE.MeshPhongMaterial({
      color:this.data.color,
      shading:THREE.FlatShading
    })

    //geometry
    const frameGeom = new THREE.OctahedronGeometry(2.5,2)

    //material
    const frameMat = new THREE.MeshPhongMaterial({
      color:'#FFFFFF',
      opacity:this.data.opacity,
      transparent:true,
      wireframe:true
    })

    const icosFrame = new THREE.Mesh(frameGeom,frameMat)

    const { x,y,z } = obj.parent.position
    icosFrame.position.set(x,y,z)

    if (this.data.wireframe){
      scene.add(icosFrame)
    }

    if(this.data.nodes){
      let spheres = new THREE.Group()
      let vertices = icosFrame.geometry.vertices

      for(var i in vertices){
        let geometry = new THREE.SphereGeometry(0.045, 16, 16)
        let material = new THREE.MeshBasicMaterial({
          color:'#FFFFFF',
          opacity:this.data.opacity,
          shading:THREE.FlatShading,
          transparent:true
        })

        let sphere = new THREE.Mesh(geometry,material)

        sphere.position.set(
          vertices[i].x,
          vertices[i].y + 4,
          vertices[i].z + -10.0
        )
        spheres.add(sphere)
      }

      scene.add(spheres)

    }
  },

  update: function(){
    const obj = this.el.getObject3D('mesh')
    obj.material.color = new THREE.Color(this.data.color)
  }

});
