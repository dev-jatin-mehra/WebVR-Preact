AFRAME.registerComponent("lowpoly", {
  schema: {
    color: { type: "string", default: "#FFF" },
    nodes: { type: "boolean", default: false },
    opacity: { type: "number", default: 1.0 },
    wireframe: { type: "boolean", default: false },
  },
  init:function(){
    console.log('The color of out component is ',this.data.color)
  }
});
