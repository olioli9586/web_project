$(function() {
    $("#addTaskButton").on("click", addTask);
    $(document).on("change", ".task-item input[type='checkbox']", updateProgress);
  });
  
  function addTask() {
    var taskInput = $("#taskInput");
    var taskText = taskInput.val();
    if (taskText.trim() === "") {
      return;
    }
    
    var taskItem = $("<div>").addClass("task-item");
    var checkbox = $("<input>").attr("type", "checkbox");
    var span = $("<span>").text(taskText);
    
    taskItem.append(checkbox, span);
    $("#taskList").append(taskItem);
    
    taskInput.val("");
    updateProgress();
  }
  
  function updateProgress() {
    var totalTasks = $(".task-item").length;
    var completedTasks = $(".task-item input:checked").length;
    
    var progressBar = $("#progressBar");
    progressBar.attr("max", totalTasks);
    progressBar.attr("value", completedTasks);
  }
  