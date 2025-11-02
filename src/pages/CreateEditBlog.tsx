import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import RichTextEditor from '../components/RichTextEditor';
import apiClient from '../lib/api';
import { useAuth } from '../lib/AuthContext';
import { ArrowLeft } from 'lucide-react';

const CreateEditBlog: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (id) {
      fetchPost();
    }
  }, [id, isLoggedIn, navigate]);

  const fetchPost = async () => {
    try {
      const response = await apiClient.get(`/blogs/${id}`);
      const post = response.data.data;
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image || '');
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        content,
        image: image || undefined,
      };

      if (isEditing) {
        await apiClient.put(`/blogs/${id}`, payload);
        alert('Blog post updated successfully');
      } else {
        await apiClient.post('/blogs', payload);
        alert('Blog post created successfully');
      }

      navigate('/');
    } catch (error: any) {
      console.error('Error saving post:', error);
      alert(error.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Form */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-base font-semibold">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog post title"
                  className="mt-2"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <Label htmlFor="image" className="text-base font-semibold">
                  Image URL
                </Label>
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image URL (optional)"
                  className="mt-2"
                />
                {image && (
                  <div className="mt-3">
                    <img
                      src={image}
                      alt="Preview"
                      className="max-h-48 rounded-lg"
                      onError={() => alert('Invalid image URL')}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content" className="text-base font-semibold">
                  Content *
                </Label>
                <div className="mt-2">
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Write your blog content here..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {loading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateEditBlog;