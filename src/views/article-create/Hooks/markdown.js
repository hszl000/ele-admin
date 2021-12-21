// md编辑器
import Editor from '@toast-ui/editor'
import { ref } from 'vue'
// 获取dom节点
export const $editor = ref(null)
export let mdAndEditor
export const mdAndEditorFn = () => {
  mdAndEditor = new Editor({
    el: $editor.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical'
  })

  mdAndEditor.getMarkdown()
  mdAndEditor.setPlaceholder('请写入你的想法')
}
