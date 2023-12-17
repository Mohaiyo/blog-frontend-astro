document.addEventListener('astro:page-load', () => {
  let copyButtonLabel = 'Copy'

  let codeBlocks = Array.from(document.querySelectorAll('pre'))

  async function copyCode(block: HTMLPreElement, button: HTMLButtonElement) {
    let code = block.querySelector('code')
    let text = code?.innerText
    if (text) {
      await navigator.clipboard.writeText(text)
      // visual feedback that task is completed
      button.innerText = 'Copied'
      button.style.width = '70px'
      setTimeout(() => {
        button.innerText = copyButtonLabel
        button.style.width = '50px'
      }, 1000)
    }
  }

  for (let codeBlock of codeBlocks) {
    let wrapper = document.createElement('div')
    wrapper.style.position = 'relative'

    let copyButton = document.createElement('button')
    copyButton.className = 'copy-code'
    copyButton.style.width = '50px'
    copyButton.innerHTML = copyButtonLabel

    codeBlock.setAttribute('tabindex', '0')
    codeBlock.appendChild(copyButton)

    codeBlock.parentNode?.insertBefore(wrapper, codeBlock)
    wrapper.appendChild(codeBlock)

    copyButton.addEventListener('click', async () => {
      await copyCode(codeBlock, copyButton)
    })
  }
})
