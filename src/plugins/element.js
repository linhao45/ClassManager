import Vue from 'vue'
import { Button } from 'element-ui'
import { Form, FormItem, Input } from 'element-ui'
import { Message, Dialog, Col, Row, Container, Header, Aside, Main } from 'element-ui'
import { Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
import { Divider, Avatar, Breadcrumb, BreadcrumbItem, Card, Table, TableColumn } from 'element-ui'
import { MessageBox, TimePicker, DatePicker } from 'element-ui'
import { Select, Option, Upload } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Row)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Divider)
Vue.use(Avatar)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)

Vue.use(TimePicker)
Vue.use(DatePicker)

Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm