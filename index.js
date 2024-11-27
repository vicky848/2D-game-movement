let score = 0;
let cross = true;
let isGameOver = false;

let audio = new Audio('music.mp3');

let audiogo = new Audio("gameover.mp3");

setTimeout = (()=> {
audio.play()

},1000)





document.addEventListener("DOMContentLoaded", () => {
  const scoreCount = document.querySelector("#scoreCount");

  if (!scoreCount) {
    console.error("Element with ID 'scoreCount' not found.");
    return;
  }

  document.onkeydown = function (e) {
    console.log("Key code:", e.keyCode);

    if (e.key === "ArrowUp") {
      if (isGameOver) return;
      const boy = document.querySelector(".boy");
      boy.classList.add("animationBoy");
      setTimeout(() => {
        boy.classList.remove("animationBoy");
      }, 700);
    }

    if (e.key === "ArrowRight") {
      const boy = document.querySelector(".boy");
      const boyX = parseInt(
        window.getComputedStyle(boy, null).getPropertyValue("left")
      );
      boy.style.left = boyX + 112 + "px";
    }

    if (e.key === "ArrowLeft") {
      const boy = document.querySelector(".boy");
      const boyX = parseInt(
        window.getComputedStyle(boy, null).getPropertyValue("left")
      );
      boy.style.left = boyX - 112 + "px";
    }
  };

  setInterval(() => {
    if (isGameOver) return;

    const boy = document.querySelector(".boy");
    const gameOver = document.querySelector(".gameOver");
    const obs = document.querySelector(".obs");

    const bx = parseInt(
      window.getComputedStyle(boy, null).getPropertyValue("left")
    );
    const by = parseInt(
      window.getComputedStyle(boy, null).getPropertyValue("top")
    );

    const ox = parseInt(
      window.getComputedStyle(obs, null).getPropertyValue("left")
    );
    const oy = parseInt(
      window.getComputedStyle(obs, null).getPropertyValue("top")
    );

    const offsetX = Math.abs(bx - ox);
    const offsetY = Math.abs(by - oy);

    if (offsetX < 75 && offsetY < 52) {
      gameOver.style.visibility = "visible";
      obs.classList.remove("obsAnimation");
      audiogo.play()
      setTimeout(() => {
        audiogo.pause()
      }, 1000);
      isGameOver = true;
    } else if (offsetX < 145 && cross) {
      score += 1;
      updateScore(score);
      cross = false;
      setTimeout(() => {
        cross = true;
      }, 1000);
      setTimeout(() => {
        aniDur =  parseFloat(window.getComputedStyle(obs, null).getPropertyValue("animation-duration"));
        newDur = aniDur - 0.1
        obs.style.animationDuration = newDur + 's';

      },500)


     

    }
  }, 10);

  function updateScore(score) {
    scoreCount.innerHTML = "Your Score: " + score;
  }
});
