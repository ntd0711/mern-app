import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePost from './pages/create-post';
import PostDetail from './pages/detail-post';
import PostList from './pages/list-post';

function BlogFeature() {
    return (
        <Routes>
            <Route path="/" element={<PostList />} />
            <Route path=":id" element={<PostDetail />} />
            <Route path="create" element={<CreatePost />} />
        </Routes>
    );
}

export default BlogFeature;
