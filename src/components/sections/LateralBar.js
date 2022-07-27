import { CalendarIcon, ChatIcon, ArrowLeftIcon, TagIcon, HomeIcon } from '@heroicons/react/outline'

import { Link } from 'react-router-dom'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function LateralBar (props) {

    const {projectId} = props;

    const navigation = [
        { name: 'Home', icon: HomeIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}` },
        { name: 'Tasks', icon: TagIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}/tasks` },
        { name: 'Xats', icon: ChatIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}/xat`},
        { name: 'Calendar', icon: CalendarIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}/monthCalendar`  },
        { name: 'Projects', icon: ArrowLeftIcon, href: '#', current: false, keyLink: "", link: "/"}
    ]

    console.log(navigation)

    return (
        <div className=" hidden xl:flex lg:flex flex-col flex-grow h-screen border-r border-gray-200 pb-4 bg-white">
            <div className="mt-1 flex-grow flex flex-col xl:mr-16">
                <nav className="flex-1  bg-white space-y-1" aria-label="Sidebar">
                    {navigation.map((item) => (
                        <Link key={item.keyLink} to={`${item.link}`}> 
                            <a
                            key={item.name}
                            href
                            className={classNames(
                                item.current
                                ? 'bg-green-50 border-green-600 text-green-600'
                                : 'border-transparent text-green-600 hover:bg-green-50 hover:text-green-900',
                                'group flex items-center px-3 py-2 text-sm xl:text-lg  font-medium border-l-4 mb-3'
                            )}
                            >
                            <item.icon
                                className={classNames(
                                item.current ? 'text-green-500' : 'text-green-700 group-hover:text-green-500',
                                'mr-5 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                            </a>
                        </Link>
                    ))}
    
                </nav>
                
            </div>
        </div>
    )
}

export default LateralBar;
