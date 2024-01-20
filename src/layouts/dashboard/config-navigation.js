import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  home: icon('home'),
  games: icon('games'),
  players: icon('players'),
  branches: icon('branches'),
  categories: icon('categories'),
  news: icon('news'),
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'General',
        items: [
          { title: 'home', path: paths.dashboard.root, icon: ICONS.home },
          // { title: 'Oyunlar', path: paths.dashboard.games, icon: ICONS.games },
          // {
          //   roles: ['True'],
          //   title: 'For Admin Page',
          //   path: paths.dashboard.forAdmin,
          //   icon: ICONS.blog,
          // },
          // {
          //   roles: ['True'],
          //   title: 'Tarlalar',
          //   path: paths.dashboard.fields.root,
          //   icon: ICONS.branches,
          // },
          {
            roles: ['True'],
            title: 'emergency',
            path: paths.dashboard.allEmergency.root,
            icon: ICONS.chat,
          },
          {
            roles: ['True'],
            title: 'Workers',
            path: paths.dashboard.workers.root,
            icon: ICONS.branches,
          },
          {
            // roles: ['True'],
            title: 'work_program',
            path: paths.dashboard.workProgram.root,
            icon: ICONS.calendar,
          },
          // {
          //   roles: ['False'],
          //   title: 'İşlerim',
          //   path: paths.dashboard.myWorks.root,
          //   icon: ICONS.blank,
          // },
          {
            title: 'definations',
            path: paths.dashboard.fields.root,
            icon: ICONS.branches,
            children: [
              {
                roles: ['True'],
                title: 'fields',
                path: paths.dashboard.fields.root,
                // icon: ICONS.branches,
              },
              {
                roles: ['False'],
                title: 'my_works',
                path: paths.dashboard.myWorks.root,
                // icon: ICONS.blank,
              },

              {
                roles: ['True'],
                title: 'work_types',
                path: paths.dashboard.workTypes.root,
                // icon: ICONS.branches,
              },
            ],
          },
          {
            roles: ['True'],
            title: 'daily_location_report',
            path: paths.dashboard.reports.root,
            icon: ICONS.menuItem,
          },
        ],
      },

      //       {
      //   subheader: 'Kullanıcılar',
      //   items: [
      //     {
      //       title: 'Kullanıcılar',
      //       path: paths.dashboard.members.root,
      //       icon: ICONS.user,
      //       children: [
      //         { title: 'Kullanıcılar', path: paths.dashboard.members.root},
      //       ],
      //     },
      //   ],
      // },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      // {
      //   subheader: 'management',
      //   items: [
      //     {
      //       title: 'user',
      //       path: paths.dashboard.group.root,
      //       icon: ICONS.user,
      //       children: [
      //         { title: 'four', path: paths.dashboard.group.root },
      //         { title: 'five', path: paths.dashboard.group.five },
      //         { title: 'six', path: paths.dashboard.group.six },
      //       ],
      //     },
      //   ],
      // },
    ],
    []
  );

  return data;
}
