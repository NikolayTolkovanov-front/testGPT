document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM LOADED");
  isWebP();
  addFile();
  changeColorSubmitBtn();
  toggleAside();
  toggleAsideByOverflow();
  tippyAll();
  toggleChangeQuestion();
  scrollToLastMessage()
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
  const overflow = document.querySelector(".overflow");

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
            overflow.classList.add("hidden");
          } else if (btn === "header") {
            toggleAsideBtns["header"].classList.add("hidden");
            overflow.classList.remove("hidden");
          }
        });
      }
    }
  }
}

function toggleAsideByOverflow() {
  const aside = document.querySelector("nav.aside");
  const overflow = document.querySelector(".overflow");

  if (aside && overflow) {
    const headerToggleBtn = document.querySelector(".header__toggle-btn");

    overflow.addEventListener("click", function () {
      aside.classList.add("hidden");
      overflow.classList.add("hidden");
      headerToggleBtn.classList.remove("hidden");
    });
  }
}

function tippyAll() {
  {
    const toggleNavBtn = document.querySelector(".toggle-nav");
    const toggleNavTextPopup = document.querySelector("#toggle-nav-text-popup");

    const newChatBtn = document.querySelector(".new-chat");
    const newChatTextPopup = document.querySelector("#new-chat-text-popup");

    const botsListBtn = document.querySelector(".bots-list-btn");
    const botsListTextPopup = document.querySelector("#aside-bots-list");

    const chatsListBtns = document.querySelectorAll(
      ".chat-subitem__btn-actions"
    );
    const chatsListTextPopup = document.querySelector("#chats-list-text-popup");
    const chatsListMenuPopup = document.querySelector("#chats-list-menu");

    const headerChatList = document.querySelector(".header__chat-btn-wrapper");
    const headerMenuPopup = document.querySelector("#header-chat-menu");

    const answers = document.querySelectorAll(".answer");

    if (toggleNavBtn && toggleNavTextPopup) {
      tippy(toggleNavBtn, {
        content: toggleNavTextPopup.innerHTML,
        allowHTML: true,
        arrow: true,
        placement: "right",
        theme: "text",
      });
    }

    if (newChatBtn && newChatTextPopup) {
      tippy(newChatBtn, {
        content: newChatTextPopup.innerHTML,
        allowHTML: true,
        arrow: true,
        placement: "bottom",
        theme: "text",
      });
    }

    if (botsListBtn && botsListTextPopup) {
      tippy(botsListBtn, {
        content: botsListTextPopup.innerHTML,
        trigger: 'click',
        allowHTML: true,
        arrow: false,
        placement: "bottom-end",
        interactive: true,
        maxWidth: 210,
        theme: "list",
      });
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
          });
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
          });
        }
      }
    }

    if (headerChatList && headerMenuPopup) {
      tippy(headerChatList, {
        content: headerMenuPopup.innerHTML,
        trigger: "click",
        allowHTML: true,
        arrow: false,
        placement: "bottom-start",
        interactive: true,
        theme: "list",
        onShow(instance) {
          const headerToggleAsideBtn = document.querySelector(
            "button.header__toggle-btn"
          );

          if (
            window.innerWidth < 769 &&
            !headerToggleAsideBtn.classList.contains("hidden")
          ) {
            instance.setProps({ placement: "bottom" });
          } else {
            instance.setProps({ placement: "bottom-start" });
          }
        },
      });
    }

    if (answers.length) {
      for (let answer of answers) {
        const copyTextBtn = answer.querySelector(".copy-text-btn");
        const copyTextPopup = answer.querySelector(".copy-text-popup");
        const regenerateTextBtn = answer.querySelector(".regenerate-text-btn");
        const regenerateTextPopup = answer.querySelector(
          ".regenerate-text-popup"
        );

        if (copyTextBtn && copyTextPopup) {
          tippy(copyTextBtn, {
            content: copyTextPopup.innerHTML,
            trigger: "mouseenter",
            allowHTML: true,
            arrow: true,
            placement: "bottom",
            animation: false,
            theme: "text",
          });
        }
        if (regenerateTextBtn && regenerateTextPopup) {
          tippy(regenerateTextBtn, {
            content: regenerateTextPopup.innerHTML,
            trigger: "mouseenter",
            allowHTML: true,
            arrow: true,
            placement: "bottom",
            animation: false,
            theme: "text",
          });
        }
      }
    }
  }
}

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
      },
    });
  }
}

function toggleChangeQuestion() {
  const questions = document.querySelectorAll(".question");

  if (questions.length) {
    for (let question of questions) {
      const changeQuestionBtn = question.querySelector(".question__change-btn");
      const escapeQuestionBtn = question.querySelector(".btn-escape");

      if (changeQuestionBtn && escapeQuestionBtn) {
        const questionTextBody = question.querySelector(".question__body");
        const changeQuestionBody = question.querySelector(".change-question");

        changeQuestionBtn.addEventListener("click", function (event) {
          event.preventDefault();

          questionTextBody.classList.add("hidden");
          changeQuestionBody.classList.remove("hidden");
        });

        escapeQuestionBtn.addEventListener("click", function (event) {
          event.preventDefault();

          questionTextBody.classList.remove("hidden");
          changeQuestionBody.classList.add("hidden");
        });
      }
    }
  }
}
 
function scrollToLastMessage() {
  const messages = document.querySelectorAll('.message')

  if (messages.length) {
    const lastMessage = messages[messages.length - 1]

    if (lastMessage) {
      lastMessage.scrollIntoView({behavior: 'smooth'})
    }
  }
}
