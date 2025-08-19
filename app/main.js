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
        effects="bloom, film, fxaa"
        bloom="radius:0.99"
        film="sIntensity: 0.15; nIntensity:0.15"
        fxaa
        environment={{
          preset: "starry",
          seed: 2,
          lightPosition: { x: 5.0, y: 0.03, z: -0.5 },
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
            event-set__1={{
              _event: "mouseenter",
              scale: { x: 1.4, y: 1.4, z: 1.4 },
            }}
            event-set__1={{
              _event: "mouseleave",
              scale: { x: 1, y: 1, z: 1 },
            }}
            raycaster="objects: .clickable"
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

        <Entity
          class="clickable"
          lowpoly={{
            color: COLORS[this.state.colorIndex],
            nodes: true,
            opacity: 0.15,
            wireframe: true,
          }}
          primitive="a-octahedron"
          detail={2}
          radius={2}
          position={{ x: 0.0, y: 4, z: -10.0 }}
          color="#FAFAF1"
          events={{
            click: this._handleClick.bind(this),
          }}
          animation__rotate={{
            property: "rotation",
            dur: 60000,
            easing: "linear",
            loop: true,
            to: { x: 0, y: 360, z: 0 },
          }}
          animation__oscillate={{
            property: "position",
            dur: 2000,
            dir: "alternate",
            easing: "linear",
            loop: true,
            from: this.state.spherePosition,
            to: {
              x: this.state.spherePosition.x,
              y: this.state.spherePosition.y + 0.25,
              z: this.state.spherePosition.z,
            },
          }}
        />
      </Scene>
    );
  }

  _handleClick() {
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % COLORS.length,
    });
  }
}

export default App;
