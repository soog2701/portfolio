<script>
  let file;
  let text = "";
  let str = "";
  let toStr = "";
  let textCopy = "";

  const processFile = (file) => {
    var reader = new FileReader();
    reader.onload = function () {
      text = reader.result.replace(/(<([^>]+)>)/gi, "");
      textCopy = JSON.parse(JSON.stringify(text));
    };
    reader.readAsText(file, "utf-8");
  };

  const fileUpload = (e) => {
    processFile(e.target.files[0]);
  };

  const changeText = () => {
    if (text) {
      if (!toStr) {
        text = text.replace(new RegExp(str, "gi"), " ");
      } else {
        text = text.replace(new RegExp(str, "gi"), toStr);
      }
    }
  };
  const resize = (evt) => {
    const target = evt.target;
    target.style.height = calcHeight(target.value) + "px";
    highLight();
  };
  const calcHeight = (value) => {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
  };
  const highLight = () => {
    textCopy = textCopy.replace(/(<([^>]+)>)/gi, "");
    if (text) {
      let copy = textCopy;
      if (str.match(/\n/)) {
        const arrayStr = str.split(/\n/);
        const textCopy = JSON.stringify(text);
        let multi = "";
        arrayStr.forEach((text) => {
          multi = multi + `<span class='highlight'>${text}</span>`;
        });
        console.log(JSON.stringify(text));
        console.log(textCopy.match(JSON.stringify(str)));
        // copy = textCopy.replaceAll(str, multi);
      } else {
        copy = textCopy.replaceAll(
          str,
          `<span class='highlight'>${str}</span>`
        );
      }
      textCopy = copy;
    }
  };
  const textareaScroll = (evt) => {
    document.querySelector(".textarea-bg").scrollTop = evt.srcElement.scrollTop;
  };
</script>

<main>
  <div class="box">
    <div class="file">
      <span>.txt 파일올리기 :</span>
      <input bind:value={file} on:input={fileUpload} type="file" accept="txt" />
    </div>
    <div class="text">
      <div class="top">
        전체 텍스트에서
        <textarea
          class="getStr"
          on:keyup|self={resize}
          type="text"
          bind:value={str}
        />
        --->
        <textarea
          class="getStr"
          on:keyup|self={resize}
          type="text"
          bind:value={toStr}
        />
        <button on:click={changeText} style="margin-left:10px;margin-bottom: 0;"
          >😄변환</button
        >
        <span style="color:red;">주의 되돌릴 수 없어요😄</span>
      </div>
      <div class="find">
        <textarea
          class="textarea"
          bind:value={text}
          on:scroll={textareaScroll}
        />
        <div class="textarea-bg">{@html textCopy}</div>
      </div>
    </div>
  </div>
</main>

<style>
  .box {
    display: flex;
    flex-direction: column;
  }
  .box::selection {
    color: red;
    background: yellow;
  }
  .file span {
    margin-right: 1em;
    color: crimson;
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .text .textarea {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .find {
    position: relative;
    height: 50vh;
    width: 90%;
  }
  .textarea-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: hidden;
    z-index: -1;
    white-space: pre-wrap;
    text-align: initial;
    font-family: inherit;
    font-size: inherit;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    color: transparent;
  }
  .getStr {
    overflow: hidden;
    resize: both;
    margin-bottom: 0;
    height: 32px;
    min-height: 20px;
    line-height: 20px;
  }
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
  }
  .textarea-bg :global(.highlight) {
    display: inline-block;
    background-color: gold;
    border-color: transparent;
    border-radius: 2px;
  }
</style>
