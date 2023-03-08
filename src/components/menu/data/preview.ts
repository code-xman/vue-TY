import {menuType} from '../menuList';

const components: menuType[] = [
  {
    title: 'preview',
    index: 'preview',
    child: [
      {
        title: 'previewPDF',
        index: 'previewPDF',
        path: '/preview/pdf'
      },
    ]
  },
]

export default components