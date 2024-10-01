

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM LOADED");
  isWebP()
  addFile()
  changeColorSubmitBtn()
  toggleAside()
  toggleAsideByOverflow()
  tippyAll()
  toggleChangeAnswer()
});

function isWebP() {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  testWebP(function (support) {
    if (support == true) {
      document.querySelector("html").classList.add("webp");
    } else {
      document.querySelector("html").classList.add("no-webp");
    }
  });
}

function toggleAside() {
  const toggleAsideBtns = {
    aside: document.querySelector("button.toggle-nav"),
    header: document.querySelector("button.header__toggle-btn"),
  };

  const aside = document.querySelector("nav.aside");
  const overflow = document.querySelector('.overflow')

  if (aside) {
    for (let btn in toggleAsideBtns) {
      if (toggleAsideBtns[btn]) {
        toggleAsideBtns[btn].addEventListener("click", function () {
          if (aside.classList.contains("hidden")) {
            aside.classList.remove("hidden");
          } else {
            aside.classList.add("hidden");
          }
  
          if (btn === "aside") {
            toggleAsideBtns["header"].classList.remove("hidden");
            overflow.classList.add('hidden')
          } else if (btn === "header") {
            toggleAsideBtns["header"].classList.add("hidden");
            overflow.classList.remove('hidden')
          }
        });
      }
    }
  }
}

function toggleAsideByOverflow() {
  const aside = document.querySelector("nav.aside")
  const overflow = document.querySelector('.overflow')

  if (aside && overflow) {
    const headerToggleBtn = document.querySelector('.header__toggle-btn')

    overflow.addEventListener('click', function() {
      aside.classList.add("hidden")
      overflow.classList.add('hidden')
      headerToggleBtn.classList.remove('hidden')
    })
  }
}

function tippyAll() {{
  const toggleNavBtn = document.querySelector('.toggle-nav')
  const toggleNavTextPopup = document.querySelector('#toggle-nav-text-popup')
  
  const newChatBtn = document.querySelector('.new-chat')
  const newChatTextPopup = document.querySelector('#new-chat-text-popup')

  const botsListItems = document.querySelectorAll('.bots-list__item')
  const botsListTextPopup = document.querySelector('#bots-list-text-popup')

  const chatsListBtns = document.querySelectorAll('.chat-subitem__btn-actions')
  const chatsListTextPopup = document.querySelector('#chats-list-text-popup')
  const chatsListMenuPopup = document.querySelector('#chats-list-menu')
  
  const asideFooter = document.querySelector('.aside-footer')
  const asideMenuPopup = document.querySelector('#aside-profile-menu')

  const headerChatList = document.querySelector('.header__chat-btn-wrapper')
  const headerMenuPopup = document.querySelector('#header-chat-menu')

  const headerProfileBtn =  document.querySelector('.header-profile__btn')
  const headerProfileMenu = document.querySelector('#header-profile-menu')

  const copyTextBtn = document.querySelector('#copy-text-btn')
  const copyTextPopup = document.querySelector('#copy-text-popup')
  const regenerateTextBtn = document.querySelector('#regenerate-text-btn')
  const regenerateTextPopup = document.querySelector('#regenerate-text-popup')


  if (toggleNavBtn && toggleNavTextPopup) {
    tippy(toggleNavBtn, {
      content: toggleNavTextPopup.innerHTML,
      allowHTML: true,
      arrow: true,
      placement: "right",
      theme: "text",
    })
  }

  if (newChatBtn && newChatTextPopup) {
    tippy(newChatBtn, {
      content: newChatTextPopup.innerHTML,
      allowHTML: true,
      arrow: true,
      placement: "bottom",
      theme: "text",
    })
  }

  if (botsListItems && botsListTextPopup) {
    for (let item of botsListItems) {
      const itemBtn = item.querySelector('.bots-list__icon--right')

      if (itemBtn) {
        tippy(itemBtn, {
          content: botsListTextPopup.innerHTML,
          allowHTML: true,
          arrow: true,
          placement: "right",
          theme: "text",
        })
      }
    }
  }

  if (chatsListBtns.length) {

    if (chatsListTextPopup) {
      for (let btn of chatsListBtns) {
        tippy(btn, {
          content: chatsListTextPopup.innerHTML,
          allowHTML: true,
          arrow: true,
          placement: "right",
          theme: "text",
        })
      }
    }

    // TODO
    if (chatsListMenuPopup) {
      for (let btn of chatsListBtns) {
        tippy(btn, {
          content: chatsListMenuPopup.innerHTML,
          trigger: "click",
          allowHTML: true,
          arrow: false,
          placement: "bottom-end",
          interactive: true,
          theme: "list",
        })
      }
    }
  }

  if (asideFooter && asideMenuPopup) {
    tippy(asideFooter, {
      content: asideMenuPopup.innerHTML,
      trigger: 'click',
      allowHTML: true,
      arrow: false,
      placement: "top-start",
      maxWidth: 235,
      theme: "list",
    })
  }

  if (headerChatList && headerMenuPopup) {
    tippy(headerChatList, {
      content: headerMenuPopup.innerHTML,
      trigger: 'click',
      allowHTML: true,
      arrow: false,
      placement: "bottom-start",
      interactive: true,
      theme: "list",
      onShow(instance) {
        const headerToggleAsideBtn = document.querySelector("button.header__toggle-btn")
        console.log('headerToggleAsideBtn', headerToggleAsideBtn.classList.contains('hidden'));
        if (window.innerWidth < 769 && !headerToggleAsideBtn.classList.contains('hidden')) {
          instance.setProps({ placement: 'bottom' })
        } else {
          instance.setProps({ placement: "bottom-start" })
        }
      }
    })
  }

  if (headerProfileBtn && headerProfileMenu) {
    tippy(headerProfileBtn, {
      content: headerProfileMenu.innerHTML,
      trigger: 'click',
      allowHTML: true,
      arrow: false,
      placement: "bottom-start",
      theme: "list",
    })
  }

  if (copyTextBtn && copyTextPopup) {
    tippy(copyTextBtn, {
      content: copyTextPopup.innerHTML,
      trigger: 'mouseenter',
      allowHTML: true,
      arrow: true,
      placement: "bottom",
      animation: false,
      theme: "text",
    })
  }

  if (regenerateTextBtn && regenerateTextPopup) {
    tippy(regenerateTextBtn, {
      content: regenerateTextPopup.innerHTML,
      trigger: 'mouseenter',
      allowHTML: true,
      arrow: true,
      placement: "bottom",
      animation: false,
      theme: "text",
    })
  }
}}

function changeColorSubmitBtn() {
  const promptText = document.querySelector("#prompt-text");
  const submitBtn = document.querySelector("button.submit-btn");
  if (promptText && submitBtn) {
    promptText.addEventListener("input", function (event) {
      const promptContent = event.target.textContent;
      if (!promptContent.length) {
        submitBtn.classList.remove("filled");
      } else {
        submitBtn.classList.add("filled");
      }
    });
  }
}

function addFile() {
  const fileInput = document.querySelector("#input-file");
  const fileInputBtn = document.querySelector("button.input-file__btn");

  if (fileInput && fileInputBtn) {
    const inputTextPopup = document.querySelector("#input-text-popup");
    const inputMenuPopup = document.querySelector("#input-menu");

    fileInputBtn.addEventListener("click", function (event) {
      event.preventDefault();
    });

    tippy(fileInputBtn, {
      content: inputTextPopup.innerHTML,
      trigger: "mouseenter",
      allowHTML: true,
      arrow: true,
      hideOnClick: true,
      placement: "top",
      theme: "text",
    });

    tippy(fileInputBtn, {
      content: inputMenuPopup.innerHTML,
      trigger: "click",
      allowHTML: true,
      arrow: false,
      placement: "top-start",
      interactive: true,
      theme: "list",
      onMount(instance) {
        const fileInputMenuBtn = document.querySelector(
          `div#tippy-${instance.id} #input-file-link`
        );
    
        fileInputMenuBtn.addEventListener("click", function (event) {
          event.preventDefault();
          fileInput.click();
        });
      }
    });

  }
}

function toggleChangeAnswer() {
  const answers = document.querySelectorAll('.answer')

  if (answers.length) {
    for (let answer of answers) {
      const changeAnswerBtn = answer.querySelector('.answer__change-btn')
      const escapeAnswerBtn = answer.querySelector('.btn-escape')

      if (changeAnswerBtn && escapeAnswerBtn) {
        const answerTextBody = answer.querySelector('.answer__body')
        const changeAnswerBody = answer.querySelector('.change-answer')

        changeAnswerBtn.addEventListener('click', function(event) {
          event.preventDefault()

          answerTextBody.classList.add('hidden')
          changeAnswerBody.classList.remove('hidden')
        })

        escapeAnswerBtn.addEventListener('click', function(event) {
          event.preventDefault()

          answerTextBody.classList.remove('hidden')
          changeAnswerBody.classList.add('hidden')
        })
      }
    }
  }
}