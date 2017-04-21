import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ':global DraftEditor-root': {
    'height': [{ 'unit': '%V', 'value': 1 }],
    'minHeight': [{ 'unit': 'px', 'value': 250 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e9e9e9' }],
    'margin': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }]
  },
  ':global nna-blockquote': {
    'borderLeft': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#eee' }],
    'color': '#666',
    'fontStyle': 'italic',
    'margin': [{ 'unit': 'px', 'value': 16 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 16 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 20 }]
  },
  ':global nna-button ant-btn': {
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'margin': [{ 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 2 }, { 'unit': 'px', 'value': 2 }]
  },
  ':global nna-button ant-btn[disabled]': {
    'backgroundColor': 'transparent'
  },
  ':global public-DraftStyleDefault-pre': {
    'backgroundColor': 'rgba(0, 0, 0, 0.05)',
    'fontFamily': ''Inconsolata', 'Menlo', 'Consolas', monospace',
    'fontSize': [{ 'unit': 'px', 'value': 16 }],
    'padding': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 20 }]
  },
  ':global nna-center-aligned-block > div': {
    'display': 'inline'
  },
  ':global nna-left-aligned-block > div': {
    'display': 'inline'
  },
  ':global nna-right-aligned-block > div': {
    'display': 'inline'
  },
  ':global nna-default-aligned-block > div': {
    'display': 'inline'
  },
  ':global nna-center-aligned-block': {
    'textAlign': 'center'
  },
  ':global nna-left-aligned-block': {
    'textAlign': 'left'
  },
  ':global nna-right-aligned-block': {
    'textAlign': 'right'
  },
  ':global nna-default-aligned-block': {
    'textAlign': 'justify'
  },
  'nna-editor': {
    'position': 'relative',
    'paddingTop': [{ 'unit': 'px', 'value': 30 }]
  },
  'nna-editor nna-editor-toolbar': {
    'position': 'absolute',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'top': [{ 'unit': 'px', 'value': 10 }],
    'borderBottom': [{ 'unit': 'px', 'value': 2 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#e9e9e9' }]
  }
});
