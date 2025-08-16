"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookOpen, Clock, CheckCircle, PlayCircle, X } from "lucide-react"

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
  skillId?: string // Added skillId to map lessons to skills
  content: {
    introduction: string
    sections: Array<{
      title: string
      content: string
      codeExample?: string
    }>
    summary: string
  }
}

interface LessonsListProps {
  selectedLessonId?: string | null
  onLessonSelect?: (lessonId: string | null) => void
  onLessonComplete?: (skillId: string) => void // Added callback for lesson completion
}

export function LessonsList({ selectedLessonId, onLessonSelect, onLessonComplete }: LessonsListProps) {
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
      skillId: "html", // Added skillId mapping
      content: {
        introduction:
          "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements and tags.",
        sections: [
          {
            title: "Basic HTML Structure",
            content:
              "Every HTML document starts with a DOCTYPE declaration and contains html, head, and body elements.",
            codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
          },
          {
            title: "Common HTML Elements",
            content: "Learn about headings, paragraphs, links, and other essential HTML elements.",
            codeExample: `<h1>Main Heading</h1>
<p>This is a paragraph.</p>
<a href="https://example.com">This is a link</a>`,
          },
        ],
        summary:
          "HTML provides the foundation for all web pages. Master these basics to build structured, semantic web content.",
      },
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
      skillId: "css", // Added skillId mapping
      content: {
        introduction:
          "CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and positioning.",
        sections: [
          {
            title: "CSS Selectors",
            content: "Learn how to target HTML elements using different types of selectors.",
            codeExample: `/* Element selector */
h1 { color: blue; }

/* Class selector */
.highlight { background: yellow; }

/* ID selector */
#header { font-size: 24px; }`,
          },
          {
            title: "Box Model",
            content: "Understanding margin, border, padding, and content areas.",
            codeExample: `.box {
  margin: 10px;
  border: 2px solid black;
  padding: 20px;
  width: 200px;
}`,
          },
        ],
        summary:
          "CSS transforms plain HTML into beautiful, responsive designs. These fundamentals are essential for modern web development.",
      },
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
      skillId: "js", // Added skillId mapping
      content: {
        introduction:
          "JavaScript is a programming language that adds interactivity to web pages. It can manipulate HTML elements, handle events, and create dynamic content.",
        sections: [
          {
            title: "Variables and Data Types",
            content: "Learn how to store and work with different types of data in JavaScript.",
            codeExample: `let name = "John";
const age = 25;
var isStudent = true;

console.log(name, age, isStudent);`,
          },
          {
            title: "Functions",
            content: "Functions are reusable blocks of code that perform specific tasks.",
            codeExample: `function greet(name) {
  return "Hello, " + name + "!";
}

const result = greet("Alice");
console.log(result);`,
          },
        ],
        summary:
          "JavaScript brings web pages to life with dynamic behavior and interactivity. Master these basics to build engaging user experiences.",
      },
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
      skillId: "python", // Added skillId mapping
      content: {
        introduction:
          "Python is a versatile, beginner-friendly programming language known for its simple syntax and powerful capabilities.",
        sections: [
          {
            title: "Python Syntax",
            content: "Learn the basic syntax and structure of Python programs.",
            codeExample: `# This is a comment
print("Hello, World!")

name = "Python"
version = 3.9
print(f"Welcome to {name} {version}!")`,
          },
        ],
        summary:
          "Python's simplicity makes it perfect for beginners while being powerful enough for complex applications.",
      },
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
      skillId: "design", // Added skillId mapping
      content: {
        introduction:
          "Good design principles create visually appealing and user-friendly interfaces that communicate effectively.",
        sections: [
          {
            title: "Color Theory",
            content: "Understanding how colors work together and affect user perception.",
          },
          {
            title: "Typography",
            content: "Choosing and pairing fonts for readability and visual hierarchy.",
          },
        ],
        summary:
          "Design principles guide the creation of beautiful, functional interfaces that users love to interact with.",
      },
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
      skillId: "react", // Added skillId mapping
      content: {
        introduction:
          "React components are the building blocks of React applications, allowing you to create reusable UI elements.",
        sections: [
          {
            title: "Functional Components",
            content: "Learn how to create components using functions.",
            codeExample: `function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Welcome;`,
          },
        ],
        summary: "React components enable modular, maintainable code that scales with your application's complexity.",
      },
    },
  ])

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)

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
      prevLessons.map((lesson) => {
        if (lesson.id === lessonId) {
          const updatedLesson = { ...lesson, progress: 100, completed: true }
          if (lesson.skillId && onLessonComplete) {
            setTimeout(() => {
              onLessonComplete(lesson.skillId!)
            }, 0)
          }
          return updatedLesson
        }
        return lesson
      }),
    )
  }

  const handleLearnLesson = (lessonId: string) => {
    console.log(`Opening lesson content for: ${lessonId}`)
    const lesson = lessons.find((l) => l.id === lessonId)
    if (lesson) {
      setSelectedLesson(lesson)
      setIsLessonModalOpen(true)
      setLessons((prevLessons) =>
        prevLessons.map((lesson) => {
          if (lesson.id === lessonId) {
            const newProgress = lesson.progress === 0 ? 25 : Math.min(100, lesson.progress + 25)
            const isCompleted = newProgress === 100

            if (isCompleted && lesson.skillId && onLessonComplete) {
              setTimeout(() => {
                onLessonComplete(lesson.skillId!)
              }, 0)
            }

            return { ...lesson, progress: newProgress, completed: isCompleted }
          }
          return lesson
        }),
      )
    }
  }

  const closeLessonModal = () => {
    setIsLessonModalOpen(false)
    setSelectedLesson(null)
  }

  useEffect(() => {
    if (selectedLessonId) {
      const element = document.getElementById(`lesson-${selectedLessonId}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
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

                <div className="space-y-2">
                  <Progress value={lesson.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">Progress: {lesson.progress}%</div>
                </div>
              </div>

              <div className="ml-6 flex flex-col gap-2">
                {lesson.completed ? (
                  <Button variant="outline" disabled className="w-32 bg-transparent">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Studied
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

      <Dialog open={isLessonModalOpen} onOpenChange={setIsLessonModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">{selectedLesson?.icon}</span>
                {selectedLesson?.title}
              </DialogTitle>
              <Button variant="ghost" size="sm" onClick={closeLessonModal}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedLesson && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Badge variant="outline">{selectedLesson.category}</Badge>
                <Badge className={`text-white ${getDifficultyColor(selectedLesson.difficulty)}`}>
                  {selectedLesson.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {selectedLesson.duration} min
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  {selectedLesson.progress}% complete
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Introduction</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedLesson.content.introduction}</p>
              </div>

              <div className="space-y-6">
                {selectedLesson.content.sections.map((section, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="text-lg font-semibold mb-2">{section.title}</h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{section.content}</p>
                    {section.codeExample && (
                      <div className="bg-muted p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{section.codeExample}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedLesson.content.summary}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={closeLessonModal} className="flex-1">
                  Continue Learning
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleStudied(selectedLesson.id)
                    closeLessonModal()
                  }}
                >
                  Mark as Completed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
