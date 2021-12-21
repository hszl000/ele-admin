// 富文本编辑器
import E from 'wangeditor'
import { ref } from 'vue'

export const $div = ref(null)
export const $text = ref(null)
export let editor
export const editorFn = () => {
  editor = new E($div.value)
  editor.config.height = 380
  editor.config.onchange = function (html) {
    // 第二步，监控变化，同步更新到 textarea
    $text.value.value = html
  }
  editor.create()
  $text.value.value = editor.txt.html()
}
