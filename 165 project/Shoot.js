AFRAME.registerComponent("bullets", {
    init: function () {
      this.shootBullet();
    },
    shootBullet: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "s") {
            var bullet = document.createElement("a-entity");
  
            bullet.setAttribute("geometry", {
               primitive: "sphere",
               radius: 0.5,
            });
  
          bullet.setAttribute("material", "color", "red");
  
          var cam = document.querySelector("#cameraRig");
  
          pos = cam.getAttribute("position");
  
            bullet.setAttribute("position", {
              x: pos.x,
               y: pos.y+1.2,
               z: pos.z-4.9,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
         
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          bullet.setAttribute("velocity", direction.multiplyScalar(-50));
  
          var scene = document.querySelector("#scene");

          bullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "20",
          });
  
          bullet.setAttribute("visible", true);
  
          
          bullet.addEventListener("collide", this.removeBullet);
          scene.appendChild(bullet);
         
          this.shootSound();
        }
      });
    },
    removeBullet: function (e) {
      var scene = document.querySelector("#scene");
      //bullet element
      var element = e.detail.target.el;
  
      //element which is hit
      var elementHit = e.detail.body.el;
      
      if(elementHit.id.includes("enemy")){     
  
        var countMonsterEl = document.querySelector("#countMonster");
        var monsterFired = parseInt(countMonsterEl.getAttribute("text").value);
        monsterFired -= 1;
  
        countMonsterEl.setAttribute("text", {
          value: monsterFired
        });
  
        if (monsterFired === 0) {
          var txt = document.querySelector("#completed");
          txt.setAttribute("visible", true);       
          
        }
        scene.removeChild(elementHit);
      }
  

      element.removeEventListener("collide", this.removeBullet);    
      scene.removeChild(element);
    },
    shootSound: function () {
      var entity = document.querySelector("#Sound1");
      entity.components.sound.playSound();
    },
  });
  