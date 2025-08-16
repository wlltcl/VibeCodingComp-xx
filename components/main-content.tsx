"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillMap } from "@/components/skill-map"
import { LessonsList } from "@/components/lessons-list"

export function MainContent() {
  const [activeTab, setActiveTab] = useState("map")
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [completedSkills, setCompletedSkills] = useState<string[]>([])
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  useEffect(() => {
    const savedSkills = localStorage.getItem("completedSkills")
    const savedLessons = localStorage.getItem("completedLessons")

    if (savedSkills) {
      setCompletedSkills(JSON.parse(savedSkills))
    } else {
      // Default starting skills
      setCompletedSkills(["start", "html"])
    }

    if (savedLessons) {
      setCompletedLessons(JSON.parse(savedLessons))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("completedSkills", JSON.stringify(completedSkills))
  }, [completedSkills])

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons))
  }, [completedLessons])

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

  const handleLessonComplete = (skillId: string) => {
    console.log(`[v0] Lesson completed for skill: ${skillId}`)

    if (!completedSkills.includes(skillId)) {
      setCompletedSkills((prev) => {
        const newSkills = [...prev, skillId]
        console.log(`[v0] Updated completed skills:`, newSkills)
        return newSkills
      })
    }

    const skillToLessonMap: Record<string, string> = {
      html: "1",
      css: "2",
      js: "3",
      python: "4",
      design: "5",
      react: "6",
    }

    const lessonId = skillToLessonMap[skillId]
    if (lessonId && !completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => {
        const newLessons = [...prev, lessonId]
        console.log(`[v0] Updated completed lessons:`, newLessons)
        return newLessons
      })
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
          <SkillMap onNavigateToLesson={handleNavigateToLesson} completedSkills={completedSkills} />
        </TabsContent>

        <TabsContent value="lessons" className="flex-1 mt-4">
          <LessonsList
            selectedLessonId={selectedLessonId}
            onLessonSelect={setSelectedLessonId}
            onLessonComplete={handleLessonComplete}
            completedLessons={completedLessons}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
