import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  MenuIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
const features = [
  {
    name: 'Push to Deploy',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ',
    icon: CloudUploadIcon,
  },
  {
    name: 'SSL Certificates',
    description: 'Qui aut temporibus nesciunt vitae dicta repellat sit dolores pariatur. Temporibus qui illum aut.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple Queues',
    description: 'Rerum quas incidunt deleniti quaerat suscipit mollitia. Amet repellendus ut odit dolores qui.',
    icon: RefreshIcon,
  },

]
const blogPosts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { name: 'Article', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    author: {
      name: 'Roel Aufderehar',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '6 min',
  },
  {
    id: 2,
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    category: { name: 'Video', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    author: {
      name: 'Brenna Goyette',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '4 min',
  },
  {
    id: 3,
    title: 'Improve your customer experience',
    href: '#',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    category: { name: 'Case Study', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    preview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    author: {
      name: 'Daniela Metz',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    readingLength: '11 min',
  },
]

const HomePage = () => {
    return(
    <>    
        <NavBar />

        <div className="bg-white">
        <div className="relative overflow-hidden">
            
            <main>
                <div className="pt-10 bg-mainColor sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                    <div className="mx-auto max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                        <div className="lg:py-24">
                            
                            
                            <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                            <span className="block">A better way to</span>
                            <span className="pb-3 block bg-clip-text text-transparent bg-buttonHover from-teal-200 to-cyan-400 sm:pb-5">
                                work together
                            </span>
                            </h1>
                            <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                            Collaborate, manage projects, and reach new productivity peaks. 
                            From high rises to the home office, the way your team works is unique-accomplish it all.
                            </p>
                            
                        </div>
                        </div>
                        <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                        <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                            <img
                            className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                            src="https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg"
                            alt=""
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Feature section with screenshot */}
                <div className="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-24">
                    <div className="mx-auto max-w-xl px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
                    <div>
                        <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Serverless</h2>
                        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                        No server? No problem.
                        </p>
                        <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                        Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
                        malesuada. Eleifend condimentum id viverra nulla.
                        </p>
                    </div>
                    <div className="mt-12 -mb-10 sm:-mb-24 lg:-mb-80">
                        <img
                        className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                        src="/images/landingPage-colaborator-example.png"
                        alt=""
                        />
                    </div>
                    </div>
                </div>

                {/* Feature section with grid */}
                <div className="relative bg-white py-16 sm:py-24 lg:py-32">
                    <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                    <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Work faster</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                        Everything you need to optimize your projects
                    </p>
                    <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                    Powering a productive team means using a powerful tool (and plenty of snacks). From meetings and projects to events and goal setting, 
                    Colaborator’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.
                    </p>
                    <div className="mt-12">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="pt-6">
                            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                <div>
                                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-lg">
                                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </span>
                                </div>
                                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                                <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>

                {/* Testimonial section */}
                <div className="pb-16 bg-gradient-to-r from-teal-500 to-cyan-600 lg:pb-0 lg:z-10 lg:relative">
                    <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
                    <div className="relative lg:-my-8">
                        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
                        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                        <div className="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                            <img
                            className="object-cover lg:h-full lg:w-full"
                            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                            alt=""
                            />
                        </div>
                        </div>
                    </div>
                    <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
                        <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                        <blockquote>
                            <div>
                            <svg
                                className="h-12 w-12 text-white opacity-25"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                            >
                                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                            </svg>
                            <p className="mt-6 text-2xl font-medium text-white">
                                The best tool to work on projects. Fast and intuitive.
                            </p>
                            </div>
                            <footer className="mt-6">
                            <p className="text-base font-medium text-white">Judith Black</p>
                            <p className="text-base font-medium text-cyan-100">CTO at Bicinyap</p>
                            </footer>
                        </blockquote>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
                    <div className="relative">
                        <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                            Join Now!
                            </p>

                        </div>

                    </div>
                </div>

                
            </main>
            
        </div>
    </div>

    <Footer />

    </>    

    )
}

export default HomePage;
