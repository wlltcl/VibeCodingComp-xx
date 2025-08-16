"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, CheckCircle, PlayCircle } from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  category: string
  duration: number
  progress: number
  completed: boolean
  difficulty: "beginner" | "intermediate" | "advanced"
  icon: string
}

interface LessonsListProps {
  selectedLessonId?: string | null
  onLessonSelect?: (lessonId: string | null) => void
}

export function LessonsList({ selectedLessonId, onLessonSelect }: LessonsListProps) {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "1",
      title: "Introduction to HTML",
      description: "Learn the basics of HTML structure and semantic elements",
      category: "Web Development",
      duration: 45,
      progress: 100,
      completed: true,
      difficulty: "beginner",
      icon: "🌐",
    },
    {
      id: "2",
      title: "CSS Fundamentals",
      description: "Master styling with CSS properties and selectors",
      category: "Web Development",
      duration: 60,
      progress: 75,
      completed: false,
      difficulty: "beginner",
      icon: "🎨",
    },
    {
      id: "3",
      title: "JavaScript Basics",
      description: "Understanding variables, functions, and DOM manipulation",
      category: "Programming",
      duration: 90,
      progress: 30,
      completed: false,
      difficulty: "intermediate",
      icon: "⚡",
    },
    {
      id: "4",
      title: "Python for Beginners",
      description: "Start your programming journey with Python",
      category: "Programming",
      duration: 120,
      progress: 0,
      completed: false,
      difficulty: "beginner",
      icon: "🐍",
    },
    {
      id: "5",
      title: "Design Principles",
      description: "Learn color theory, typography, and layout principles",
      category: "Design",
      duration: 75,
      progress: 50,
      completed: false,
      difficulty: "beginner",
      icon: "🎭",
    },
    {
      id: "6",
      title: "React Components",
      description: "Build reusable UI components with React",
      category: "Web Development",
      duration: 150,
      progress: 0,
      completed: false,
      difficulty: "advanced",
      icon: "⚛️",
    },
  ])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-600"
      case "intermediate":
        return "bg-yellow-600"
      case "advanced":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Web Development":
        return "border-l-blue-500"
      case "Programming":
        return "border-l-purple-500"
      case "Design":
        return "border-l-pink-500"
      default:
        return "border-l-gray-500"
    }
  }

  const handleStudied = (lessonId: string) => {
    console.log(`Marking lesson ${lessonId} as studied`)
    setLessons((prevLessons) =>
      prevLessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, progress: 100, completed: true } : lesson)),
    )
  }

  const handleLearnLesson = (lessonId: string) => {
    console.log(`Starting/continuing lesson: ${lessonId}`)
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, progress: lesson.progress === 0 ? 25 : Math.min(100, lesson.progress + 25) }
          : lesson,
      ),
    )
  }

  useEffect(() => {
    if (selectedLessonId) {
      const element = document.getElementById(`lesson-${selectedLessonId}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        // Clear the selection after a brief delay
        setTimeout(() => {
          if (onLessonSelect) {
            onLessonSelect(null)
          }
        }, 2000)
      }
    }
  }, [selectedLessonId, onLessonSelect])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Your Learning Path</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="border-green-500 text-green-400">
            {lessons.filter((l) => l.completed).length} Completed
          </Badge>
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            {lessons.filter((l) => l.progress > 0 && !l.completed).length} In Progress
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            id={`lesson-${lesson.id}`}
            className={`p-6 bg-card border-border border-l-4 ${getCategoryColor(lesson.category)} hover:shadow-lg transition-all duration-300 ${
              selectedLessonId === lesson.id ? "ring-2 ring-primary shadow-lg scale-[1.02]" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{lesson.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                      {lesson.title}
                      {lesson.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {lesson.category}
                      </Badge>
                      <Badge className={`text-xs text-white ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{lesson.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {lesson.duration} min
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    {lesson.progress}% complete
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Progress value={lesson.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">Progress: {lesson.progress}%</div>
                </div>
              </div>

              <div className="ml-6 flex flex-col gap-2">
                {lesson.completed ? (
                  <Button variant="outline" disabled className="w-32 bg-transparent">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </Button>
                ) : lesson.progress > 0 ? (
                  <>
                    <Button className="w-32" onClick={() => handleLearnLesson(lesson.id)}>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                    <Button variant="outline" className="w-32 bg-transparent" onClick={() => handleStudied(lesson.id)}>
                      Mark Studied
                    </Button>
                  </>
                ) : (
                  <Button className="w-32" onClick={() => handleLearnLesson(lesson.id)}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Learning
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
