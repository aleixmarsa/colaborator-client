import { CalendarIcon, ChatIcon, ArrowLeftIcon, TagIcon, InboxIcon, UsersIcon } from '@heroicons/react/outline'

import { Link } from 'react-router-dom'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function LateralBar (props) {

    const {projectId} = props;

    const navigation = [
        { name: 'Tasks', icon: TagIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}/tasks` },
        { name: 'Chats', icon: ChatIcon, href: '#', current: false },
        { name: 'Calendar', icon: CalendarIcon, href: '#', current: false, keyLink: {projectId}, link: `/${projectId}/monthCalendar`  },
        { name: 'Projects', icon: ArrowLeftIcon, href: '#', current: false },
    ]

    console.log(navigation)

    return (
        <div className="flex flex-col flex-grow border-r max-w-fit  border-gray-200 pb-4 bg-white">
            <div className="mt-1 flex-grow flex flex-col">
                <nav className="flex-1 bg-white space-y-1" aria-label="Sidebar">
                    {navigation.map((item) => (
                        <Link key={item.keyLink} to={`${item.link}`}> 
                            <a
                            key={item.name}
                            href
                            className={classNames(
                                item.current
                                ? 'bg-green-50 border-green-600 text-green-600'
                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center px-3 py-2 text-sm font-medium border-l-4'
                            )}
                            >
                            <item.icon
                                className={classNames(
                                item.current ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 flex-shrink-0 h-6 w-6'
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