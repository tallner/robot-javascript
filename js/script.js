//vaiables used in several functions
let startDir = "0";
let inputStartX = 0;
let inputStartY = 0;
let field_depth = 0;
let field_width = 0;

// user input decides size of robot grid
function setGrid() {
    
    //get input values
    field_depth = document.querySelector('#input-depth').value;
    field_width = document.querySelector('#input-width').value;

    /*set the grid for the robot*/
    const grid = document.querySelector('.grid-robot');
    const width_size = 100/field_width;
    const depth_size = 100/field_depth;
    grid.style.gridTemplateColumns = "";
    grid.style.gridTemplateRows = "";
    for(let i=0;i<=field_width-1;i++){grid.style.gridTemplateColumns += `${width_size}% `;}
    for(let i=0;i<=field_depth-1;i++){grid.style.gridTemplateRows += `${depth_size}% `;}

    //draw the grid
    for(let i=0;i<=field_width-1;i++){
        for(let j=0;j<=field_depth-1;j++){
            const div = document.createElement("div");
            div.style.border = '1px solid black';
            div.style.display = 'flex';
            div.classList.add(`Pos-${i}-${j}`);
            grid.appendChild(div);    
        }
    }

}


function setStart(){
    //get input values
    inputStartX = document.querySelector('#input-start-x').value;
    inputStartY = document.querySelector('#input-start-y').value;
    const inputStartDir = document.querySelector('#input-start-dir').value;
    

    //set start direction of image
    if (inputStartDir === 'N') {startDir=180;}
    else if (inputStartDir === 'S') {startDir=0;}
    else if (inputStartDir === 'E') {startDir=270;}
    else if (inputStartDir === 'W') {startDir=90;}

    //get the start div
    const startDiv = document.querySelector(`.Pos-${inputStartY}-${inputStartX}`);
    robotImg = document.createElement("img");
    robotImg.id = "robotImg";
    robotImg.src = "img/robot.png";
    robotImg.setAttribute(`style`,`transform:rotate(${startDir}deg)`);
    //robotImg.setAttribute(`style`,`transform:rotate(90deg)`);

    robotImg.style.objectFit = "cover";
    startDiv.appendChild(robotImg);

    console.log(startDir);
    
}

function startTravel(){
    const travelPath = document.querySelector('#input-travel').value.split("");
    console.log(travelPath);
    let currentDir = startDir;
    let currentX = Number(inputStartX);
    let currentY = Number(inputStartY);
   
    for(let i=0;i<=travelPath.length;i++){


        // replaces the switch below, however switch might be more readable
        currentDir += (travelPath[i] === "L")*270 + (travelPath[i] === "R")*90;
        if (currentDir >= 360){currentDir = currentDir-360;}

        //
        currentY += (travelPath[i] === "F")*((currentDir===0) - (currentDir===180));
        currentX += (travelPath[i] === "F")*((currentDir===270) - (currentDir===90));
        //check limits
        if ((currentY >= field_depth)||(currentY <= 0)) {currentY = 0;}
        if ((currentX >= field_width)||(currentX <= 0)) {currentX = 0;}

        // for simpler syntax use formulas above
        // switch(travelPath[i]) {
        //     case "L":
        //       // rotera västerut --> minska 90 grader eller öka 270
        //       currentDir += 270;
        //       if (currentDir >= 360){currentDir = currentDir-360;}
        //       break;
            
        //     case "R":
        //       // rotera österut --> öka 90 grader --> E
        //       currentDir += 90;
        //       if (currentDir >= 360){currentDir = currentDir-360;}
        //       break;

        //     case "F":
                // switch(currentDir) {
                //     case 0://söderut
                //        //öka y med 1
                //        currentY += 1;
                //       break;
                //     case 90://västerut
                //       // minska x med 1
                //       currentX -= 1;
                //       break;
                //     case 180://norrut
                //       // minska y med 1
                //       currentY -= 1;
                //       break;
                //     case 270://österut
                //       // öka x med 1
                //       currentX += 1;
                //       break;
                //     default:
                //       // code block
                //   }
            //     break;
            // default:
              // code block
         // }

          if (travelPath[i]==="F") {

            const currDiv = document.querySelector(`.Pos-${currentY}-${currentX}`);
            //check if there is already an image, if so replace it
            robotImg = document.createElement("img");
            robotImg.id = "robotImg";
            robotImg.src = "img/robot.png";
            robotImg.setAttribute(`style`,`transform:rotate(${currentDir}deg)`);
            //robotImg.setAttribute(`style`,`transform:rotate(90deg)`);

            robotImg.style.objectFit = "cover";
            currDiv.appendChild(robotImg);
            console.log(currDiv.classList);
          }
          
           //get the start div
        
    }

    console.log(currentDir);
   // console.log(currentX);
    //console.log(currentY);
}