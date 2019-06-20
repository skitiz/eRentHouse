# Java Questions

## Java

### Why is Java not 100% Object Oriented
Because it supports primitive types like int, byte.

### How do we pass data between threads in Java.
We can use a blocking queue.

### Can main() be final in Java.
Yes, but it will throw a runtime exception "main() is not public."

### class Class is always superclass for every class?
Because it is extended by every object.

### ArrayList vs Vector
Vector is synchronized.

### Iterator vs ListIterator
Iterator is uni-directional, cannot add elements, cannot modify.

### What are daemon threads?
Low priority threads that run in the backgroud to perform tasks like garbage collection.

### What is a method reference?
A method reference is a Java8 construct that can be used to reference a method without invoking it.

### What is an optional?
Optional methods are used to replace methods which returned `null` values in previous versions. In case the return value doesn't exist, `Optional` lets you treat it with less verbose code.

### Functional Interfaces?
`Predicate`: Takes one argument and returns a `boolean`.
A `functional interface` is an interface with no more, no less than one abstract method (default methods do not count). We can use lambda expressions with functional interfaces.

### What is a default method and when do we use it?
We use default methods to add functionality to an interface while maintaning backwards compatibility with existing methods.

### What is a lambda expression and what is it used for?
In simple terms, a lambda expression is a function that is referenced and passed around as an object.

### What are the steps to connect to a database in Java?
Register the driver class, create a connection, create statements, execute statements, close the connection.

### What are the practical uses of volatile modifier?
It is used to make reading double and long atomic operations. It also provides a memory barrier. It provides a guarantee that about ordering and visibility, `volatile` assignment cannot be re-ordered.

### What are thread local variables in Java?
Thread local variables are variables which are not shared between threads. It is an object of ThreadLocal class.

### What is the difference between `sleep()` and `wait()` in Java?
Sleep is meant for a short time duration because it does not release lock on resources whereas `wait()` waits for another thread to wake it up.

### Difference between `poll()` and `remove()`?
Poll returns an exception if there is a null value.

### SOLID Principles
Single Responsibility
Open/Closed
Liskov Substitution
Interface Segregation
Dependency Inversion

Adapter Pattern and Decorator Pattern

