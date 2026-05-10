"use client"
  /*useEffect(() => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.body.classList.add("dark");
      }
    }, []);*/

import { Button } from '../../components/Global/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Global/ui/card';
//import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
    LayoutGrid,
    List,
    Calendar,
    BarChart3,
    Users,
    ArrowRight,
    Star,
    Menu,
    X,
    Code2,
    Heart,
    Download,
    Shield,
    Globe,
} from 'lucide-react';
import { useTranslations } from "next-intl";
import { useState } from 'react';
import {Badge} from "@/components/Global/Misc/Badge";
import {LanguageSwitcher} from "@/components/Global/Buttons/LanguageSwitcher";
import {Link} from "@/i18n/navigation";
import {ThemeSwitchButton} from "@/components/Global/Buttons/ThemeSwitchButton";

export default function Landing() {
    const t = useTranslations();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const features = [
        {
            icon: LayoutGrid,
            title: 'Kanban Boards',
            description: 'Visualize your workflow with intuitive drag-and-drop boards',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            icon: List,
            title: 'List Views',
            description: 'Detailed tables with filtering, sorting, and advanced search',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
        {
            icon: Calendar,
            title: 'Calendar Integration',
            description: 'Track deadlines and milestones with calendar views',
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            icon: BarChart3,
            title: 'Analytics Dashboard',
            description: 'Real-time insights and reports on team performance',
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
        },
        {
            icon: Users,
            title: 'Team Collaboration',
            description: 'Manage members, roles, and permissions seamlessly',
            color: 'text-pink-600',
            bgColor: 'bg-pink-100',
        },
        {
            icon: Code2,
            title: 'Self-Hosted',
            description: 'Deploy on your own infrastructure with full control',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
        },
    ];

    const openSourceBenefits = [
        {
            icon: Code2,
            title: 'Open Source',
            description: 'Transparent, community-driven development',
        },
        {
            icon: Shield,
            title: 'No Vendor Lock-in',
            description: 'Own your data, host anywhere',
        },
        {
            icon: Heart,
            title: 'Community Support',
            description: 'Active community and regular updates',
        },
        {
            icon: Download,
            title: 'Easy Deployment',
            description: 'Docker, Kubernetes, or traditional hosting',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full backdrop-blur-md border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                PM
                            </div>
                            <span className="font-bold text-xl">ProjectHub</span>
                            <Badge className="ml-2 bg-green-100 text-green-700">
                                Open Source
                            </Badge>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900">
                                {t('landing.footer.features')}
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                                GitHub
                            </a>
                            <LanguageSwitcher />
                            <ThemeSwitchButton/>
                            <Button variant="outline" asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">{t('landing.hero.cta')}</Link>
                            </Button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-4 space-y-3">
                            <a
                                href="#features"
                                className="block text-gray-600 hover:text-gray-900 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Features
                            </a>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button className="w-full" asChild>
                                <Link href="/register">Get Started Free</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {t('landing.hero.title')}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            {t('landing.hero.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-lg px-8" asChild>
                                <Link href="/register">
                                    {t('landing.hero.cta')}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-purple-50 text-purple-700 hover:bg-purple-100">
                            {t('landing.footer.features')}
                        </Badge>
                        <h2 className="text-4xl font-bold mb-4">{t('landing.features.title')}</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed to help teams of all sizes manage projects efficiently
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                                            <Icon className={`w-6 h-6 ${feature.color}`} />
                                        </div>
                                        <CardTitle>{feature.title}</CardTitle>
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Screenshot Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100">
                            Interface
                        </Badge>
                        <h2 className="text-4xl font-bold mb-4">Beautiful & Intuitive Design</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            A clean, modern interface that your team will love to use every day
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-2xl">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 text-center text-sm text-gray-600">
                                    projecthub.com
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="h-8 bg-gradient-to-r from-blue-200 to-blue-100 rounded"></div>
                                        <div className="h-32 bg-blue-50 rounded-lg"></div>
                                        <div className="h-32 bg-purple-50 rounded-lg"></div>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-8 bg-gradient-to-r from-purple-200 to-purple-100 rounded"></div>
                                        <div className="h-24 bg-purple-50 rounded-lg"></div>
                                        <div className="h-40 bg-green-50 rounded-lg"></div>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-8 bg-gradient-to-r from-green-200 to-green-100 rounded"></div>
                                        <div className="h-40 bg-green-50 rounded-lg"></div>
                                        <div className="h-24 bg-orange-50 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Source Benefits Section */}
            <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-green-50 text-green-700 hover:bg-green-100">
                            Open Source
                        </Badge>
                        <h2 className="text-4xl font-bold mb-4">Built by the community, for the community</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            No hidden costs, no vendor lock-in, no compromises
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {openSourceBenefits.map((benefit) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={benefit.title} className="text-center">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-4">Contribute to ProjectHub</h3>
                                <p className="text-gray-600 mb-6">
                                    Join our community of developers and help make ProjectHub even better.
                                    Whether you&#39;re fixing bugs, adding features, or improving documentation,
                                    every contribution matters.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Badge className="bg-blue-100 text-blue-700">React</Badge>
                                    <Badge className="bg-purple-100 text-purple-700">TypeScript</Badge>
                                    <Badge className="bg-green-100 text-green-700">Node.js</Badge>
                                    <Badge className="bg-orange-100 text-orange-700">PostgreSQL</Badge>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button size="lg" variant="outline" asChild>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        View Source Code
                                    </a>
                                </Button>
                                <Button size="lg" asChild>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        Start Contributing
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to transform your team&#39;s productivity?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Start using ProjectHub today — completely free, forever
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                            <Link href="/register">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 bg-transparent text-white border-white hover:bg-white/10"
                            asChild
                        >
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                                Star on GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                                    PM
                                </div>
                                <span className="font-bold text-xl text-white">ProjectHub</span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                The free and open source project management platform for teams that want to deliver great work.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                </a>
                                <Shield className="w-5 h-5" />
                                <Globe className="w-5 h-5" />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-3">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#features" className="hover:text-white">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                        Roadmap
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                        Changelog
                                    </a>
                                </li>
                                <li>
                                    <Link href="/register" className="hover:text-white">
                                        Get Started
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-3">Community</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-3">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Deployment Guide
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        API Reference
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}
