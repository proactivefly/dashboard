import type { App } from 'vue';
import { Input, Button, Layout, Space, Card, Form, Checkbox } from 'ant-design-vue';
export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout).use(Space).use(Card).use(Form).use(Checkbox);
}
