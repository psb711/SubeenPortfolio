$(document).ready(function () {
  // ✅ 0. 초기 이미지 위치 애니메이션
  $(".hello1 .imgbox img:nth-child(1)").css({ transform: 'translate(586px, -105px)', opacity: 1 });
  $(".hello1 .imgbox img:nth-child(2)").css({ transform: 'translate(-790px, 400px)', opacity: 1 });
  $(".hello1 .imgbox img:nth-child(3)").css({ transform: 'translate(454px, 346px)', opacity: 1 });
  $(".hello1 .imgbox img:nth-child(4)").css({ transform: 'translate(88px, -49px)', opacity: 1 });
  $(".hello1 .imgbox img:nth-child(5)").css({ transform: 'translate(-650px, -30px)', opacity: 1, zIndex: 2 });
  $(".hello1 .imgbox img:nth-child(6)").css({ transform: 'translate(-800px, -170px)', opacity: 1 });
  $(".hello1 .imgbox img:nth-child(7)").css({ transform: 'translate(30px, 192px)', opacity: 1 });

  setTimeout(function () {
    $(".hello1 .tbox p").css({ opacity: 1 });
  }, 1500);

  // ✅ 1. 텍스트 스크롤 애니메이션
  $(window).on('scroll', function () {
    const scrollTop = $(window).scrollTop();

    if (scrollTop > 300) {
      $(".hello1").css({
        filter: 'blur(8px) brightness(0.6)',
        opacity: 0.7
      });
    } else {
      $(".hello1").css({
        filter: 'none',
        opacity: 1
      });
    }

    const step = 100;

    $('.txtinnerbox p').each(function (index) {
      const elementTop = $('.coment .textbox').offset().top;
      const triggerPoint = index * step;
      if (scrollTop > elementTop + triggerPoint) {
        $(this).addClass('visible');
      } else {
        $(this).removeClass('visible');
      }
    });

    const $closingPs = $('.Closing .textbox p');
    const step2 = 80;
    $closingPs.each(function (index) {
      const elementTop = $('.Closinginnerbox').offset().top;
      const triggerPoint = index * step2;
      if (scrollTop > elementTop + triggerPoint) {
        $(this).addClass('visible');
      } else {
        $(this).removeClass('visible');
      }
    });
  });

  // ✅ 초기 로딩 시에도 스크롤 트리거
  $(window).trigger('scroll');

  // ✅ 2. 설명 텍스트 정의
  const descriptions = {
    1: {
      title: "물음표",
      text: "직장에서 단순히 주어진 업무만 수행해서는\n돌발 상황에 효과적으로 대응하거나\n성과를 극대화하는데 한계가 있음을 깨달았습니다.\n새로운 업무를 배울 때마다\n‘원인’과 ‘핵심’을 깊이 이해하려 노력했고,\n이러한 태도는 저의 업무 역량을 높이는 것은 물론,\n변화하는 환경 속에서도 꾸준히 성과를 내는 힘이 되었습니다.",
      img: "./img/puzzle1D.png"
    },
    2: {
      title: "젤라또",
      text: "젤라또 가게에서 아르바이트를 하며,\n다양한 재료와 이야기들이 어우러져 새로운 맛으로 탄생하는 과정을 지켜보는 것이 무척 흥미로웠습니다.\n조합의 가능성이 무궁무진하다는 점에 깊은 인상을 받았고,\n저 역시 여러 아이디어를 조화롭게 엮어 새로운 이야기를 만들어내는 일을 하고 싶다는 열망을 갖게 되었습니다.\n젤라또는 제게 기획에 대한 흥미와 열정을 일깨워준,\n가장 좋아하는 디저트입니다.",
      img: "./img/puzzle2D.png"
    },
    3: {
      title: "타지생활",
      text: "늘 친구, 가족, 동아리 등 소속된 무리 안에서 소속감을 느끼며 살아왔습니다.\n하지만 타지로 홀로 이사한 뒤 처음으로 ‘무리 속의 나’가 아닌 ‘온전한 나’를 마주하게 되었습니다.\n낯설고 외로운 시간이었지만,\n스스로를 깊이 들여다보고 문제를 해결하며 감정을 다스리는 법을 배우는 계기가 되었습니다.\n덕분에 낯선 환경에서도 두려움보다는 용기를 가질 수 있는 사람으로 성장하였습니다.",
      img: "./img/puzzle3D.png"
    },
    4: {
      title: "휴식",
      text: "학창 시절부터 아르바이트, 학업, 동아리 활동 등으로 바쁘게 지내는 삶을 즐겨왔습니다.\n이번에 경험한 ‘휴식’을 통해\n저는 단순한 활동이 아닌 명확한 목표를 향해 나아가며 성취를 이루는 과정에서 진정한 보람과 에너지를 느낀다는 사실을 깨달았습니다.\n이 경험은 일에 대한 태도를 다시 정의하게 했고,\n앞으로 더욱 주도적이고 의미 있는 방향으로 나아가고자 다짐했습니다.",
      img: "./img/puzzle4D.png"
    }
  };

  // ✅ 3. 퍼즐 드래그 앤 드롭
  const pieces = document.querySelectorAll('.puzzle-piece');
  const slots = document.querySelectorAll('.puzzle-slot');
  const modal = document.getElementById('modal');
  const descriptionBox = document.getElementById('description');
  const imgBox = document.querySelector('.introduce .imgbox');
  const textBox = document.querySelector('.txtbox');

  let draggedId = null;

  pieces.forEach(piece => {
    piece.addEventListener('dragstart', () => {
      draggedId = piece.dataset.id;
    });
  });

  slots.forEach(slot => {
    slot.addEventListener('dragover', (e) => e.preventDefault());

    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      const acceptedId = slot.dataset.accept;

      if (acceptedId === draggedId) {
        const piece = document.querySelector(`.puzzle-piece[data-id='${draggedId}']`);
        const pieceimg = piece.querySelector('img');
        const container = document.getElementById('puzzle-container');
        const slotRect = slot.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const left = slotRect.left - containerRect.left;
        const top = slotRect.top - containerRect.top;

        const slotImg = slot.querySelector('img');
        let width = slot.offsetWidth;
        let height = slot.offsetHeight;

        if (slotImg) {
          width = slotImg.offsetWidth || width;
          height = slotImg.offsetHeight || height;
        }

        piece.style.position = 'absolute';
        piece.style.left = `${left}px`;
        piece.style.top = `${top}px`;
        piece.style.zIndex = '10';
        pieceimg.style.width = `${width}px`;
        pieceimg.style.height = `${height}px`;
        piece.setAttribute('draggable', 'false');
        container.appendChild(piece);

        // 설명 표시
        const data = descriptions[draggedId];
        descriptionBox.innerHTML = `<h4>${data.title}</h4>`;
        imgBox.innerHTML = `<img src="${data.img}" alt="puzzle image">`;
        textBox.innerText = data.text;
        modal.style.display = 'flex';

        // ✅ 퍼즐 완성 확인
        const completedPieces = document.querySelectorAll('.puzzle-piece[draggable="false"]').length;
        const totalPieces = Object.keys(descriptions).length;

   if (completedPieces === totalPieces) {
  const completeEl = document.getElementById('complete');
  completeEl.classList.add('show');
}

      } else {
        alert("틀린 위치입니다! 다시 시도하세요.");
      }
    });
  });
});
