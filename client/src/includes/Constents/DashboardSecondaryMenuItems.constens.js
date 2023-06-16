const MyAccountRoutes = [
    {
        key: 0,
        menu: false,
        parent: "my-account",
        parentHeading: "My Account",
        href: "/dashboard/my-account",
        redirect: true,
        redirectUrl: "/dashboard/my-account/overview",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 1,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-overview",
        childHeading: "Overview",
        href: "/dashboard/my-account/overview",
        icon: "user-circle",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 2,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-settings",
        childHeading: "Settings",
        href: "/dashboard/my-account/settings",
        icon: "fa-cog",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 3,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-security",
        childHeading: "Security",
        href: "/dashboard/my-account/security",
        icon: "fingerprint",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 4,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-billings",
        childHeading: "Billings",
        href: "/dashboard/my-account/billings",
        icon: "credit-card",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 5,
        menu: true,
        parent: "my-account",
        parentHeading: "My Account",
        child: "my-account-logs",
        childHeading: "Logs",
        href: "/dashboard/my-account/logs",
        icon: "calander",
        baseUrl: "/dashboard/my-account/overview",
        type: "child",
        dynamicRoute: false
    }
]; 

const IeltsLmsRoutes = [
    {
        key: 0,
        menu: false,
        parent: "ielts-lms",
        parentHeading: "Ielts Lms",
        href: "/dashboard/ielts-lms",
        redirect: true,
        redirectUrl: "/dashboard/ielts-lms/my",
        baseUrl: "/dashboard/ielts-lms/my",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 1,
        menu: true,
        parent: "ielts-lms",
        parentHeading: "Ielts Lms",
        child: "ielts-lms-my-quizzes",
        childHeading: "My Quizzes",
        href: "/dashboard/ielts-lms/my",
        icon: "fa-book",
        actions: true,
        actionsHtml: ["my-quizz-actions"],
        baseUrl: "/dashboard/ielts-lms/my",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 2,
        menu: true,
        parent: "ielts-lms",
        parentHeading: "Ielts Lms",
        child: "ielts-lms-free-quizzes",
        childHeading: "Free Quizzes",
        href: "/dashboard/ielts-lms/free",
        icon: "fa-bookmark",
        baseUrl: "/dashboard/ielts-lms/my",
        type: "child",
        dynamicRoute: false
    },
    {
        key: 3,
        menu: false,
        parent: "ielts-lms",
        parentHeading: "Ielts Lms",
        child: "ielts-lms-edit-quiz",
        childHeading: "Edit Quiz",
        href: "/dashboard/ielts-lms/quiz/edit",
        parms: true,
        baseUrl: "/dashboard/ielts-lms/my",
        type: "child",
        dynamicRoute: true
    }
];

const ReadingRoutes = [
    {
        key: 0,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "edit",
        subChildHeading: "Edit",
        slug: "ielts-lms-edit-quiz-basic",
        subChildSubHeading: "Edit Basic details",
        href: "edit",
        activeClass: "bg-light-primary txt-primary border-primary",
        icon: "svg-pencil",
        iconColorClass: "svg-icon-primary",
        iconBgColorClass: "bg-light-primary"
    },
    {
        key: 1,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "Passages",
        subChildHeading: "Passages",
        slug: "ielts-lms-edit-quiz-passages",
        subChildSubHeading: "Reading Passages",
        href: "passages",
        activeClass: "bg-light-warning txt-warning border-warning",
        icon: "svg-1",
        iconColorClass: "svg-icon-warning",
        iconBgColorClass: "bg-light-warning"
    },
    {
        key: 2,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "questions",
        subChildHeading: "Questions",
        slug: "ielts-lms-edit-quiz-questions",
        subChildSubHeading: "Reading Questions",
        href: "questions",
        activeClass: "bg-light-danger txt-danger border-danger",
        icon: "svg-2",
        iconColorClass: "svg-icon-danger",
        iconBgColorClass: "bg-light-danger"
    },
    {
        key: 3,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "settings",
        subChildHeading: "Settings",
        slug: "ielts-lms-edit-quiz-settings",
        subChildSubHeading: "Reading settings & scores",
        href: "settings",
        activeClass: "bg-light-info txt-info border-info",
        icon: "svg-3",
        iconColorClass: "svg-icon-info",
        iconBgColorClass: "bg-light-info"
    },
    {
        key: 4,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "analytics",
        subChildHeading: "Analytics",
        slug: "ielts-lms-edit-quiz-analytics",
        subChildSubHeading: "Reading quiz logs & analytics",
        href: "analytics",
        activeClass: "bg-light-secondary txt-secondary border-secondary",
        icon: "svg-analytics",
        iconColorClass: "svg-icon-dark-secondary",
        iconBgColorClass: "bg-light-secondary"
    }
];

const ListeningRoutes = [
    {
        key: 0,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "edit",
        subChildHeading: "Edit",
        slug: "ielts-lms-edit-quiz-basic",
        subChildSubHeading: "Edit Basic details",
        href: "edit",
        activeClass: "bg-light-primary txt-primary border-primary",
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor"></path>
            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor"></path>
        </svg>,
        iconColorClass: "svg-icon-primary",
        iconBgColorClass: "bg-light-primary"
    },
    {
        key: 1,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "Passages",
        subChildHeading: "Passages",
        slug: "ielts-lms-edit-quiz-passages",
        subChildSubHeading: "Listening Passages",
        href: "passages",
        activeClass: "bg-light-warning txt-warning border-warning",
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11Z" fill="currentColor"/>
            <path opacity="0.3" d="M13 6.5C13 4 15 2 17.5 2C20 2 22 4 22 6.5C22 9 20 11 17.5 11C15 11 13 9 13 6.5ZM6.5 22C9 22 11 20 11 17.5C11 15 9 13 6.5 13C4 13 2 15 2 17.5C2 20 4 22 6.5 22ZM17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22Z" fill="currentColor"/>
        </svg>,
        iconColorClass: "svg-icon-warning",
        iconBgColorClass: "bg-light-warning"
    },
    {
        key: 2,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "questions",
        subChildHeading: "Questions",
        slug: "ielts-lms-edit-quiz-questions",
        subChildSubHeading: "Listening Questions",
        href: "questions",
        activeClass: "bg-light-danger txt-danger border-danger",
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 7C5.88071 7 7 5.88071 7 4.5C7 3.11929 5.88071 2 4.5 2C3.11929 2 2 3.11929 2 4.5C2 5.88071 3.11929 7 4.5 7Z" fill="currentColor"/>
            <path opacity="0.3" d="M14 4.5C14 5.9 12.9 7 11.5 7C10.1 7 9 5.9 9 4.5C9 3.1 10.1 2 11.5 2C12.9 2 14 3.1 14 4.5ZM18.5 2C17.1 2 16 3.1 16 4.5C16 5.9 17.1 7 18.5 7C19.9 7 21 5.9 21 4.5C21 3.1 19.9 2 18.5 2ZM4.5 9C3.1 9 2 10.1 2 11.5C2 12.9 3.1 14 4.5 14C5.9 14 7 12.9 7 11.5C7 10.1 5.9 9 4.5 9ZM11.5 9C10.1 9 9 10.1 9 11.5C9 12.9 10.1 14 11.5 14C12.9 14 14 12.9 14 11.5C14 10.1 12.9 9 11.5 9ZM18.5 9C17.1 9 16 10.1 16 11.5C16 12.9 17.1 14 18.5 14C19.9 14 21 12.9 21 11.5C21 10.1 19.9 9 18.5 9ZM4.5 16C3.1 16 2 17.1 2 18.5C2 19.9 3.1 21 4.5 21C5.9 21 7 19.9 7 18.5C7 17.1 5.9 16 4.5 16ZM11.5 16C10.1 16 9 17.1 9 18.5C9 19.9 10.1 21 11.5 21C12.9 21 14 19.9 14 18.5C14 17.1 12.9 16 11.5 16ZM18.5 16C17.1 16 16 17.1 16 18.5C16 19.9 17.1 21 18.5 21C19.9 21 21 19.9 21 18.5C21 17.1 19.9 16 18.5 16Z" fill="currentColor"/>
        </svg>,
        iconColorClass: "svg-icon-danger",
        iconBgColorClass: "bg-light-danger"
    },
    {
        key: 3,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "settings",
        subChildHeading: "Settings",
        slug: "ielts-lms-edit-quiz-settings",
        subChildSubHeading: "Listening settings & scores",
        href: "settings",
        activeClass: "bg-light-info txt-info border-info",
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.34375 3.9463V15.2178C1.34375 16.119 2.08105 16.8563 2.98219 16.8563H8.65093V19.4594H6.15702C5.38853 19.4594 4.75981 19.9617 4.75981 20.5757V21.6921H19.2403V20.5757C19.2403 19.9617 18.6116 19.4594 17.8431 19.4594H15.3492V16.8563H21.0179C21.919 16.8563 22.6562 16.119 22.6562 15.2178V3.9463C22.6562 3.04516 21.9189 2.30786 21.0179 2.30786H2.98219C2.08105 2.30786 1.34375 3.04516 1.34375 3.9463ZM12.9034 9.9016C13.241 9.98792 13.5597 10.1216 13.852 10.2949L15.0393 9.4353L15.9893 10.3853L15.1297 11.5727C15.303 11.865 15.4366 12.1837 15.523 12.5212L16.97 12.7528V13.4089H13.9851C13.9766 12.3198 13.0912 11.4394 12 11.4394C10.9089 11.4394 10.0235 12.3198 10.015 13.4089H7.03006V12.7528L8.47712 12.5211C8.56345 12.1836 8.69703 11.8649 8.87037 11.5727L8.0107 10.3853L8.96078 9.4353L10.148 10.2949C10.4404 10.1215 10.759 9.98788 11.0966 9.9016L11.3282 8.45467H12.6718L12.9034 9.9016ZM16.1353 7.93758C15.6779 7.93758 15.3071 7.56681 15.3071 7.1094C15.3071 6.652 15.6779 6.28122 16.1353 6.28122C16.5926 6.28122 16.9634 6.652 16.9634 7.1094C16.9634 7.56681 16.5926 7.93758 16.1353 7.93758ZM2.71385 14.0964V3.90518C2.71385 3.78023 2.81612 3.67796 2.94107 3.67796H21.0589C21.1839 3.67796 21.2861 3.78023 21.2861 3.90518V14.0964C15.0954 14.0964 8.90462 14.0964 2.71385 14.0964Z" fill="currentColor"/>
        </svg>,
        iconColorClass: "svg-icon-info",
        iconBgColorClass: "bg-light-info"
    },
    {
        key: 4,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "analytics",
        subChildHeading: "Analytics",
        slug: "ielts-lms-edit-quiz-analytics",
        subChildSubHeading: "Listening quiz logs & analytics",
        href: "analytics",
        activeClass: "bg-light-secondary txt-secondary border-secondary",
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M14 3V21H10V3C10 2.4 10.4 2 11 2H13C13.6 2 14 2.4 14 3ZM7 14H5C4.4 14 4 14.4 4 15V21H8V15C8 14.4 7.6 14 7 14Z" fill="currentColor"/>
            <path d="M21 20H20V8C20 7.4 19.6 7 19 7H17C16.4 7 16 7.4 16 8V20H3C2.4 20 2 20.4 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.4 21.6 20 21 20Z" fill="currentColor"/>
        </svg>,
        iconColorClass: "svg-icon-dark-secondary",
        iconBgColorClass: "bg-light-secondary"
    }
];

const WritingRoutes = [
    {
        key: 0,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "edit",
        subChildHeading: "Edit",
        slug: "ielts-lms-edit-quiz-basic",
        subChildSubHeading: "Edit Basic details",
        href: "edit",
        activeClass: "bg-light-primary txt-primary border-primary",
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor"></path>
            <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor"></path>
        </svg>,
        iconColorClass: "svg-icon-primary",
        iconBgColorClass: "bg-light-primary"
    },
    {
        key: 1,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "essay",
        subChildHeading: "Essay",
        slug: "ielts-lms-edit-quiz-writing-essay",
        subChildSubHeading: "Writing essay",
        href: "essay",
        activeClass: "bg-light-warning txt-warning border-warning",
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11Z" fill="currentColor"/>
            <path opacity="0.3" d="M13 6.5C13 4 15 2 17.5 2C20 2 22 4 22 6.5C22 9 20 11 17.5 11C15 11 13 9 13 6.5ZM6.5 22C9 22 11 20 11 17.5C11 15 9 13 6.5 13C4 13 2 15 2 17.5C2 20 4 22 6.5 22ZM17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22Z" fill="currentColor"/>
        </svg>,
        iconColorClass: "svg-icon-warning",
        iconBgColorClass: "bg-light-warning"
    },
];

const SpeakingRoutes = [
    {
        key: 0,
        parent: "ielts-lms",
        child: "ielts-lms-edit-quiz",
        subChild: "basic",
        subChildHeading: "Basic details",
        subChildDesc: "Edit basic details",
        icon: <></>,
        iconColorClass: "svg-icon-success",
        iconBgColorClass: "bg-light-success"
    }
];

export { MyAccountRoutes, IeltsLmsRoutes, ReadingRoutes, ListeningRoutes, WritingRoutes, SpeakingRoutes };