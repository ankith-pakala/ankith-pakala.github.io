const desc = document.getElementById("desc");

// preserve <br>
const html = desc.innerHTML;
desc.innerHTML = "";

let index = 0;

html.split(/(<br\s*\/?>)/).forEach(part => {
    if (part.startsWith("<br")) {
        desc.innerHTML += part;
    } else {
        [...part].forEach(char => {
            const span = document.createElement("span");
            span.innerHTML = char === " " ? "&nbsp;" : char;
            span.style.animation = `fade-in 0.6s ${index * 0.02}s forwards ease-out`;
            desc.appendChild(span);
            index++;
        });
    }
});



const nameEl = document.getElementById("name");
const nameText = nameEl.textContent;

nameEl.textContent = "";

[...nameText].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.animation = `name-fade 0.8s ${i * 0.1}s forwards ease-out`;
    nameEl.appendChild(span);
});

 const subtitle = document.querySelector('.subtitle');
  const text = subtitle.textContent;
  subtitle.textContent = '';

  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${i * 40}ms`;
    subtitle.appendChild(span);
  });






function openVideo() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("myVideo");

  modal.style.display = "flex";
  video.play();
}

function closeVideo(e) {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("myVideo");

  // prevent closing when clicking video itself
  if (e && e.target.tagName === "VIDEO") return;

  video.pause();
  video.currentTime = 0;
  modal.style.display = "none";
}


