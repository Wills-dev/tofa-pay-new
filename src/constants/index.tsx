import { AiOutlineAreaChart } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";
import { TbFileUpload } from "react-icons/tb";
import { GrSchedules } from "react-icons/gr";
import { GoTasklist } from "react-icons/go";
import { GoChecklist } from "react-icons/go";
import { AiFillMessage } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

export const homePageLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About us",
    url: "/about-us",
  },
];

export const homeSlider = [
  {
    url: "/images/background.jpg",
  },
  {
    url: "/images/background1.jpg",
  },
  {
    url: "/images/background2.jpg",
  },
  {
    url: "/images/background3.jpg",
  },
];

export const dashboardLinks = [
  {
    title: "Dashboard",
    links: [
      {
        name: "overview",
        link: "overview",
        icon: <AiOutlineAreaChart />,
      },
    ],
  },

  {
    title: "List",
    links: [
      {
        name: "create list",
        link: "create-list",
        icon: <TbFileUpload />,
      },
      {
        name: "all lists",
        link: "lists",
        icon: <BsCardChecklist />,
      },
      {
        name: "all list tables",
        link: "all-list-tables",
        icon: <CiCircleList />,
      },
    ],
  },
  {
    title: "Schedule",
    links: [
      {
        name: "all scheduled",
        link: "all-scheduled",
        icon: <GrSchedules />,
      },
      {
        name: "schedule tables",
        link: "all-schedule-tables",
        icon: <GoTasklist />,
      },
      {
        name: "exported schedule",
        link: "exported-schedule",
        icon: <GoChecklist />,
      },
    ],
  },
  {
    title: "Disputes",
    links: [
      {
        name: "all dispute",
        link: "dispute",
        icon: <AiFillMessage />,
      },
    ],
  },
  {
    title: "Users",
    links: [
      {
        name: "all partners",
        link: "partners",
        icon: <FaUserFriends />,
      },
      {
        name: "all users",
        link: "users",
        icon: <FaUsers />,
      },
    ],
  },
  {
    title: "My Profie",
    links: [
      {
        name: "settings",
        link: "profile",
        icon: <FiSettings />,
      },
    ],
  },
];

export const LinePrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  majorGridLines: { width: 0 },
  background: "white",
};

export const LinePrimaryYAxis = {
  labelFormat: "{value}%",
  rangePadding: "None",
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];

export const lineCustomSeries = [
  {
    dataSource: lineChartData[0],
    xName: "x",
    yName: "y",
    name: "Germany",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[1],
    xName: "x",
    yName: "y",
    name: "England",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[2],
    xName: "x",
    yName: "y",
    name: "India",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },
];
