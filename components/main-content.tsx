"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillMap } from "@/components/skill-map"
import { LessonsList } from "@/components/lessons-list"

export function MainContent() {
  const [activeTab, setActiveTab] = useState("map")
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  const handleNavigateToLesson = (skillId: string) => {
    // Map skill IDs to lesson IDs based on the skill-lesson relationship
    const skillToLessonMap: Record<string, string> = {
      html: "1", // HTML Basics -> Introduction to HTML
      css: "2", // CSS Styling -> CSS Fundamentals
      js: "3", // JavaScript -> JavaScript Basics
      python: "4", // Python Basics -> Python for Beginners
      design: "5", // Design Principles -> Design Principles
      react: "6", // React -> React Components
    }

    const lessonId = skillToLessonMap[skillId]
    if (lessonId) {
      setSelectedLessonId(lessonId)
      setActiveTab("lessons")
    }
  }

  return (
    <div className="h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-card border-border">
          <TabsTrigger
            value="map"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Map
          </TabsTrigger>
          <TabsTrigger
            value="lessons"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Lessons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="flex-1 mt-4">
          <SkillMap onNavigateToLesson={handleNavigateToLesson} />
        </TabsContent>

        <TabsContent value="lessons" className="flex-1 mt-4">
          <LessonsList selectedLessonId={selectedLessonId} onLessonSelect={setSelectedLessonId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
