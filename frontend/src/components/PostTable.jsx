import React from 'react';
import { StatusBadge } from './ui/StatusBadge';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

export function PostTable({ posts = [], showActions = false }) {
  if (!posts.length) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
        <p className="text-sm text-gray-500">No posts found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-[600px] bg-white text-left text-sm whitespace-nowrap">
        <thead className="uppercase tracking-wider border-b border-gray-200 bg-gray-50 text-gray-500">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Post Title</th>
            <th scope="col" className="px-6 py-4 font-medium">Date / Time</th>
            <th scope="col" className="px-6 py-4 font-medium">Status</th>
            <th scope="col" className="px-6 py-4 font-medium">Type</th>
            {(posts[0]?.likes !== undefined) && (
              <>
                <th scope="col" className="px-6 py-4 font-medium">Likes</th>
                <th scope="col" className="px-6 py-4 font-medium">Comments</th>
              </>
            )}
            {showActions && <th scope="col" className="px-6 py-4 text-right font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
              <td className="px-6 py-4 text-gray-500">{post.time || post.date}</td>
              <td className="px-6 py-4">
                <StatusBadge status={post.status} />
              </td>
              <td className="px-6 py-4 text-gray-500 capitalize">{post.type || 'Media'}</td>
              
              {post.likes !== undefined && (
                <>
                  <td className="px-6 py-4 text-gray-500">{post.likes}</td>
                  <td className="px-6 py-4 text-gray-500">{post.comments}</td>
                </>
              )}

              {showActions && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="text-gray-400 hover:text-primary-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
