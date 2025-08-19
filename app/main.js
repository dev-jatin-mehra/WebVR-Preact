import { h, Component } from "preact";
import { Entity, Scene } from "aframe-react";

const COLORS = ["#D92B6A", "#9564F2", "#FFCF59"];

class App extends Component {
  constructor() {
    super();

    this.state = {
      colorIndex: 0,
      spherePosition: { x: 0.0, y: 4, z: -10.0 },
    };
  }

  render() {
    return (
      <Scene
        environment={{
          preset: "starry",
          seed: 2,
          lightPosition: { x: 0.0, y: 0.03, z: -0.5 },
          fod: 0.8,
          ground: "canyon",
          groundYScale: 6.31,
          groundTexture: "walkernoise",
          groundColor: "#8a7f8a",
          grid: "none",
        }}
      >
        <Entity primitive="a-camera" look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: "white", shader: "standard", opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
          />
        </Entity>

        <Entity
          primitive="a-octahedron"
          detail={2}
          radius={2}
          position={this.state.spherePosition}
          material={{ color: "#FAFAF1", shader: "standard" }}
        />

        <Entity
          primitive="a-light"
          type="directional"
          color="#FFF"
          intensity={0.8}
          position={{ x: 2.5, y: 0.0, z: 0.0 }}
        />
      </Scene>
    );
  }
}

export default App;
