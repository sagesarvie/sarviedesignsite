document.getElementById("scrollToTop").addEventListener("click", function () {
    scrollToTop(1000);
  });
  
  function scrollToTop(duration) {
    const start = window.pageYOffset;
    const startTime = performance.now();
  
    function step(currentTime) {
      const elapsedTime = currentTime - startTime;
      const scrollTo = easeInOut(elapsedTime, start, -start, duration);
      window.scrollTo(0, scrollTo);
      if (elapsedTime < duration) {
        requestAnimationFrame(step);
      }
    }
  
    function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(step);
  }
  window.addEventListener("load", () => {
    const container = document.getElementById("scattered-container");
    const images = container.querySelectorAll(".scattered-img");
    const placed = [];
  
    images.forEach((img) => {
      let tries = 0;
      let maxTries = 100;
      let overlap = true;
  
      // Scale image before placing
      img.style.width = `${Math.random() * 10 + 10}vw`; // random 10–20vw width
  
      while (overlap && tries < maxTries) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;
  
        const x = Math.random() * (containerWidth - imgWidth);
        const y = Math.random() * (containerHeight - imgHeight);
  
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
  
        overlap = placed.some((other) => {
          const dx = other.x - x;
          const dy = other.y - y;
          return (
            Math.abs(dx) < (imgWidth + other.width) / 2 &&
            Math.abs(dy) < (imgHeight + other.height) / 2
          );
        });
  
        tries++;
      }
  
      placed.push({
        x: parseFloat(img.style.left),
        y: parseFloat(img.style.top),
        width: img.offsetWidth,
        height: img.offsetHeight,
      });
    });
  });
  