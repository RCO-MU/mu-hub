import * as React from 'react';
import BlogPost from './BlogPost/BlogPost';
import blogs from '../../../../data/blogs.json';
import './Blog.css';

export default function Blog() {
  return (
    <div className="Blog">
      <h2>MetaU Blog</h2>
      {blogs.map((blog) => (
        <BlogPost
          key={blog.title}
          title={blog.title}
          content={blog.content}
        />
      ))}
    </div>
  );
}
