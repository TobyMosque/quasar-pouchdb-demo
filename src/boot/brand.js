// import something here
import { factory } from '@toby.mosque/utils'
import { QInput, QSelect, QField, QMarkupTable, QCard, QTable, QList, QItem } from 'quasar'
const { component } = factory
const factories = {}

factories.common = {
  render ({ self, options }) {
    options.props.dark = true
  }
}

factories.field = {
  render ({ self, options }) {
    options.props.outlined = true
    if (options.props.label && options.props.reverse) {
      options.props.label = options.props.label.split('').reverse().join('')
    }
  },
  setup ({ component }) {
    component.props.reverse = Boolean
  }
}

const fields = [
  { name: 'q-input', component: QInput },
  { name: 'q-select', component: QSelect },
  { name: 'q-field', component: QField }
]
const layout = [
  { name: 'q-markup-table', component: QMarkupTable },
  { name: 'q-list', component: QList },
  { name: 'q-item', component: QItem },
  { name: 'q-card', component: QCard },
  { name: 'q-table', component: QTable }
]

// "async" is optional
export default async ({ Vue }) => {
  for (let item of fields) {
    let branded = component({
      name: item.component.options.name,
      component: item.component,
      factories: [ factories.common, factories.field ]
    })
    Vue.component(item.name, branded)
  }

  for (let item of layout) {
    let branded = component({
      name: item.component.options.name,
      component: item.component,
      factories: [ factories.common ]
    })
    Vue.component(item.name, branded)
  }
}
