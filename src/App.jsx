import React, { useRef } from "react";
import { Engine, Scene, useScene } from "react-babylonjs";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";

const DefaultScale = new Vector3(1, 1, 1);
const BiggerScale = new Vector3(1.25, 1.25, 1.25);

const mountainTexture = new Texture("/istockphoto-1435070204-170667a.jpg");
const pastTexture = new Texture("/pasto.jpg");

const SpinningBox = (props) => {
  const { position, isMountain } = props;

  return (
    <box
      size={2}
      position={position}
      scaling={isMountain ? new Vector3(1, 2, 1) : DefaultScale}
      onClick={() => console.log("Box clicked")}
      onPointerOver={() => console.log("Pointer over")}
      onPointerOut={() => console.log("Pointer out")}
    >
      <standardMaterial
        name={`mat-${position.x}-${position.z}`}
        diffuseColor={Color3.White()}
        specularColor={Color3.Black()}
        diffuseTexture={isMountain ? mountainTexture : pastTexture} // Aplicar la textura a las montañas
      />
    </box>
  );
};


const Matrix3DScene = ({ matrix }) => {
  const objects = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const position = new Vector3(i * 2, matrix[i][j][0] === 1 ? 1 : 0, j * 2); // Adjust scale and position as needed

      objects.push(
        <SpinningBox
          key={`box-${i}-${j}`}
          position={position}
          
          hoveredColor={Color3.FromHexString("#0000FF")}
          isMountain={matrix[i][j][0] === 1}
        />
      );
    }
  }

  return <>{objects}</>;
};

function generateRandomMatrix(rows, columns) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      const value = Math.random() < 0.5 ? [0] : [1]; // Crea un array con un solo número (0 o 1)
      row.push(value);
    }
    matrix.push(row);
  }
  return matrix;
}
//

const App = () => {

  
const matrix1 = generateRandomMatrix(15, 15);
console.log(matrix1)

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          <arcRotateCamera
            name="camera1"
            target={new Vector3(5, 1, 5)} // Adjust the camera target position
            alpha={Math.PI / 4}
            beta={Math.PI / 3}
            radius={15}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />
          <Matrix3DScene matrix={matrix1} />
        </Scene>
      </Engine>
    </div>
  );
};

export default App;
