import { CalendarIcon, ChatIcon, ArrowLeftIcon, TagIcon, HomeIcon } from '@heroicons/react/outline'

import { NavLink } from 'react-router-dom'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function LateralBar (props) {

    const {projectId} = props;

    

    const navigation = [
        { name: 'Home', icon: HomeIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}` },
        { name: 'Tasks', icon: TagIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}/tasks` },
        { name: 'Chats', icon: ChatIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}/chat`},
        { name: 'Calendar', icon: CalendarIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}/monthCalendar`  },
        { name: 'Projects', icon: ArrowLeftIcon, href: '#', current: false, keyLink: "", link: "/"}
    ]

    console.log(navigation)

    return (
        <div className=" hidden xl:flex lg:flex flex-col flex-grow h-screen border-r border-gray-200 pb-4 bg-white">
            <div className="mt-1 flex-grow flex flex-col xl:mr-16">
                <nav className="flex-1  bg-white space-y-1" aria-label="Sidebar">

                    {navigation.map((item) => (
                        <div className='flex flex-row ml-2 mt-2'>

                            <item.icon
                                className={classNames(
                                item.current ? 'text-gray-500' : 'text-mainColor group-hover:text-gray-500',
                                'mt-2 mr-3 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                            />

                            <NavLink
                            to={`${item.link}`}
                            className={({ isActive }) =>
                            isActive
                                ? "flex flex-col px-3 py-2 mx-1 text-md font-medium text-buttonHover bg-white hover:text-buttonHover"
                                : "flex flex-col px-3 py-2 mx-1 text-md font-medium text-mainColor bg-white hover:text-buttonHover"
                            }
                            >

                                <span className="hover:text-buttonHover text-left text-center">{item.name}</span>

                            </NavLink>
                      </div>
                    ))}
    
                </nav>
                
            </div>
        </div>
    )
}

export default LateralBar;
