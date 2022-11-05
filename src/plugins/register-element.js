// 引入
import {
    ElButton,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElMessage,
    ElBadge,
    // 临时
    // ElMessage,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElTooltip,
    ElMenuItemGroup,
    ElRow,
    ElCol,
    ElProgress,
    ElDialog,
} from 'element-plus'

import {
    Rank,
    ArrowRightBold,
    ArrowLeftBold,
    BellFilled,
    CaretBottom,
    Search,
    Avatar,
    Key,
    Plus,
    MostlyCloudy,
    // 临时
    Expand,
    Fold,
    Document,
    Menu as IconMenu,
    // IconMenu,
    Location,
    Setting,
    ArrowDown,
    User,
    Bell,
    Flag,
    Edit,
    Delete,
} from '@element-plus/icons-vue'

const components = [
    ElButton,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    // icon
    Rank,
    ArrowRightBold,
    ArrowLeftBold,
    BellFilled,
    CaretBottom,
    Search,
    ElBadge,
    Avatar,
    Key,
    Plus,
    MostlyCloudy,
    // 临时
    ElMessage,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElTooltip,
    Expand,
    Fold,
    Document,
    IconMenu,
    Location,
    Setting,
    ElMenuItemGroup,
    ArrowDown,
    ElRow,
    ElCol,
    ElProgress,
    User,
    Bell,
    Flag,
    Edit,
    Delete,
    ElDialog,

]
// 注册 方案一
// export default function (app) {
//     for (const component of components) {
//         app.component(component.name, component)
//     }
// }

// 注册 方案二
export default {
    install: (app) => {
        for (const component of components) {
            app.component(component.name, component)
        }
    },
};

