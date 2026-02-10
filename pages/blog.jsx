import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const BlogPage = () => {
    const posts = [
        {
            title: "How to Tailor Your Resume for ATS in 2024",
            excerpt: "Learn the secrets of optimizing your resume for Applicant Tracking Systems to ensure your application reaches human eyes.",
            date: "May 15, 2024",
            category: "Resume Tips",
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "10 Soft Skills That Every Employer Looks For",
            excerpt: "Beyond technical expertise, these soft skills will set you apart from other candidates in any industry.",
            date: "May 12, 2024",
            category: "Career Advice",
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop"
        },
        {
            title: "The Ultimate Guide to Writing a Cover Letter",
            excerpt: "A step-by-step guide to crafting a compelling cover letter that complements your professional resume.",
            date: "May 10, 2024",
            category: "Job Search",
            image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30">
            <Head>
                <title>Blog | ResumeCraft - Expert Career Advice</title>
                <meta name="description" content="Stay updated with the latest resume tips, career advice, and job search strategies." />
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        Career Insights & Blog
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                        Expert tips and advice to help you navigate your career journey and land your dream job.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post, index) => (
                        <article key={index} className="group bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <span className="text-slate-500 text-xs font-bold uppercase mb-3">{post.date}</span>
                                <h2 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <button className="text-blue-400 font-bold text-sm flex items-center gap-2 group/btn">
                                    Read More
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="mt-32 relative">
                    <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full" />
                    <div className="relative bg-slate-900/80 border border-white/10 rounded-[40px] p-10 md:p-20 text-center">
                        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Stay Competitive</h2>
                        <p className="text-slate-400 max-w-xl mx-auto mb-10">Get the latest career tips and resume strategies delivered straight to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input type="email" placeholder="Enter your email" className="flex-1 bg-slate-800 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all" />
                            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-blue-500/25">
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPage;
