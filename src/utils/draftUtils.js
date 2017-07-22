import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';


const htmlToEditorState = (htmlContent) => {
  if (htmlContent) {
    const blocksFromHtml = htmlToDraft(htmlContent);
    const contentBlocks = blocksFromHtml.contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    return EditorState.createWithContent(contentState);
  } else {
    return EditorState.createEmpty();
  }
};

/**
 * 提取编辑器内容，并作空值判断
 * @param  {object} editorState [编辑器状态]
 * @return {object}             [返回值包括contentValue，和isEmpty]
 */
const editorStateToHtml = (editorState) => {
  return {
    contentValue: editorState ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : null,
    isEmpty: editorState.getCurrentContent().getPlainText().length < 1,
  };
};

module.exports = {
  htmlToEditorState,
  editorStateToHtml,
};
