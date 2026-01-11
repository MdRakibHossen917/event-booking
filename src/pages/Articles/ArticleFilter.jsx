import React, { useState } from "react";
import { Search, BookOpen, GraduationCap, Briefcase, FileText, Lightbulb, Newspaper } from "lucide-react";

const categories = [
  { value: "All", label: "All", icon: BookOpen },
  { value: "General", label: "General", icon: BookOpen },
  { value: "Study Abroad", label: "Study Abroad", icon: GraduationCap },
  { value: "Career", label: "Career", icon: Briefcase },
  { value: "Visa", label: "Visa", icon: FileText },
  { value: "Tips", label: "Tips", icon: Lightbulb },
  { value: "News", label: "News", icon: Newspaper },
];

const ArticleFilter = ({ onCategoryChange, onSearchChange, selectedCategory, searchQuery }) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles..."
          className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-900">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.value;
          
          return (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 transition-all duration-200 ${
                isActive
                  ? "border border-b-0 rounded-t-lg dark:border-gray-600 dark:text-gray-900 dark:bg-gray-100 bg-white text-gray-900 border-gray-300"
                  : "border-b dark:border-gray-600 dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 border-gray-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ArticleFilter;
