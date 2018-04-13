const SocketRoutes = {
		insert_section:   "insert_section",
		insert_course	:		"insert_course",
		insert_lab_sections : "insert_lab_sections",
		update_course_offering	:		"update_course_offering",
		link_course_offering	:		"assign_section",
		unlink_course_offering	:		"unassign_section",
		delete_regcom	:		"remove_regcom",
		view_all_active_section	:		"view_all_available_sections",
		view_all_active_faculty_teaching_load	:	"view_all_assigned_sections",
		view_all_active_course_offerings :		"view_all_active_sections",
		view_all_active_courses_with_unlinked_sections	:		"view_available_courses_with_unassigned_sections",
		view_all_room_assignment	:		"search_all_room_assignment",
		view_all_unlinked_course_offerings	:		"search_all_unassigned_sections",
		search_faculty_by_id	:		"search_faculty_via_emp_no",
		search_adviser_advisee_information_by_id	:		"search_adviser_advisee_information_via_emp_no",
		search_regcom_by_id		:		"search_regcom_via_emp_no",
		search_specific_active_sections	:		"search_specific_available_sections",
		search_active_faculty_teaching_load_via_id	:		"search_assigned_sections_via_emp_no",
		search_specific_course_offerings	:		"search_specific_active_sections",
		search_course_offerings_of_specific_faculty	:		"search_sections_of_specific_faculty",

NEW SOCKETS

	search_specific_unarchived_sections
		- "Allows you to search for unarchived sections. This includes all Active, Dissolved, Petitioned, and Additional sections"

	view_all_unarchived_sections
		- "Shows all sections under Active, Dissolved, Petitioned, and Additional"

	view_all_pending_sections
		- "Shows all sections under Pending"

	search_all_unassigned_sections_via_course_id
		- "Searches through all unassigned sections using course_id"

	view_existing_courses
		- "Shows all courses that exist in the database"

	view_all_adviser
		- "Shows all faculty who are currently advisers"

SOCKETS

	search_regcom_via_emp_no
								Description:
									"Accepts emp_no and returns data of regcom member"
								Expects:
									{
										emp_no: (int),
										email_add: (string)
									}
								Returns:
									{
									  emp_no: (int),
									  name: (string),
									  email_add: (string),
									  status: (string),
									  isRegCom: (int)
									}
	view_all_regcom
								Description:
									"Returns data of all regcom members"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
										  emp_no: (int),
										  name: (string),
										  email_add: (string),
										  status: (string),
										  isRegCom: (int)
										}
									]
	view_all_lecture_sections
								Description:
									"Returns all lecture sections"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											course_offering_id: (int),
											acad_year: (int),
											semester: (int),
											time_start: (string),
											time_end: (string),
											room: (string),
											no_of_students: (int),
											unit: (int),
											day: (int),
											section: (string),
											section_type: (int),
											max_capacity: (int),
											course_id: (int),
											course_name: (string),
											course_title: (string),
											description: (string),
											name: (string),
											emp_no: (string)
										}
									]
	view_all_lab_sections
								Description:
									"Returns all lab sections"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											course_offering_id: (int),
											acad_year: (int),
											semester: (int),
											time_start: (string),
											time_end: (string),
											room: (string),
											no_of_students: (int),
											unit: (int),
											day: (int),
											section: (string),
											section_type: (int),
											max_capacity: (int),
											course_id: (int),
											course_name: (string),
											course_title: (string),
											description: (string),
											name: (string),
											emp_no: (string)
										}
									]
	view_all_assigned_sections
								Description:
									"Returns all sections that have an assigned faculty"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											emp_no: (int),
											course_name: (string),
											course_title: (string),
											description: (string),
											section: (string),
											section_type: (int),
											day: (string),
											time_start: (string),
											time_end: (string),
											room: (string),
											no_of_students: (int),
											acad_year: (int),
											semester: (int),
											unit: (int),
											max_capacity: (int),
											status: (string)
										}
									]
	search_assigned_sections_via_emp_no
								Description:
									"Accepts emp_no Searches through sections with assigned faculty"
								Expects:
									{
										emp_no: (int),
										email_add: (string)
									}
								Returns:
									[
										{
											emp_no: (int),
											course_name: (string),
											course_title: (string),
											description: (string),
											section: (string),
											section_type: (int),
											day: (string),
											time_start: (string),
											time_end: (string),
											room: (string),
											no_of_students: (int),
											acad_year: (int),
											semester: (int),
											unit: (int),
											max_capacity: (int),
											status: (string)
										}
									]
	view_adviser_advisee_information_all
								Description:
									"Returns all adviser-advisee information"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											adviser_advisee_id: (int),
											emp_no: (int),
											faculty_name: (string),
											student_name: (string),
											student_number: (int),
											curriculum: (string),
											email_add: (string),
											student_status: (string),
											adviser_advisee_status: (string)
										}
									]
	search_adviser_advisee_information_via_emp_no
								Description:
									"Searches through all adviser-advisee information using emp_no"
								Expects:
									{
										emp_no: (int),
										email_add: (string)
									}
								Returns:
									[
										{
											adviser_advisee_id: (int),
											emp_no: (int),
											faculty_name: (string),
											student_name: (string),
											student_number: (int),
											curriculum: (string),
											email_add: (string),
											student_status: (string),
											adviser_advisee_status: (string)
										}
									]
	view_all_available_sections
								Description:
									"Returns all sections that are not Dissolved and are either Active, Petitioned, Additional"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											course_offering_id:(int),
											course_id:(int),
											course_name:(string),
											course_title:(string),
											description:(string),
											acad_year:(int),
											semester:(int),
											time_start:(string),
											time_end:(string),
											room:(string),
											no_of_students:(int),
											unit:(int),
											day:(int),
											section:(string),
											section_type:(int),
											max_capacity:(int),
											emp_no:(int),
											status: (string)
										}
									]
	view_all_unarchived_sections
								Description:
									"Returns all sections that are either Active, Petitioned, Additional, or Dissolved"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											course_offering_id:(int),
											course_id:(int),
											course_name:(string),
											course_title:(string),
											description:(string),
											acad_year:(int),
											semester:(int),
											time_start:(string),
											time_end:(string),
											room:(string),
											no_of_students:(int),
											unit:(int),
											day:(int),
											section:(string),
											section_type:(int),
											max_capacity:(int),
											emp_no:(int),
											status: (string)
										}
									]
	view_all_pending_sections
								Description:
									"Returns all sections that are not yet posted"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											course_offering_id:(int),
											course_id:(int),
											course_name:(string),
											course_title:(string),
											description:(string),
											acad_year:(int),
											semester:(int),
											time_start:(string),
											time_end:(string),
											room:(string),
											no_of_students:(int),
											unit:(int),
											day:(int),
											section:(string),
											section_type:(int),
											max_capacity:(int),
											status:(string)
										}
									]
	search_specific_available_sections
								Description:
									"Searches through all sections that are either Active, Petitioned, or Additional"
								Expects:
									{
										course_id: (int),
										email_add: (string)
									}
								Returns:
									[
										{
											course_offering_id:(int),
											course_id:(int),
											course_name:(string),
											course_title:(string),
											description:(string),
											acad_year:(int),
											semester:(int),
											time_start:(string),
											time_end:(string),
											room:(string),
											no_of_students:(int),
											unit:(int),
											day:(int),
											section:(string),
											section_type:(int),
											max_capacity:(int),
											emp_no:(int),
											status: (string)
										}
									]
	search_specific_unarchived_sections
								Description:
									"Searches through all sections that are either Active, Petitioned, Additional, or Dissolved"
								Expects:
									{
										course_id: (int),
										email_add: (string)
									}
								Returns:
									[
										{
											course_offering_id:(int),
											course_id:(int),
											course_name:(string),
											course_title:(string),
											description:(string),
											acad_year:(int),
											semester:(int),
											time_start:(string),
											time_end:(string),
											room:(string),
											no_of_students:(int),
											unit:(int),
											day:(int),
											section:(string),
											section_type:(int),
											max_capacity:(int),
											emp_no:(int),
											status: (string)
										}
									]
	search_sections_of_specific_faculty
								Description:
									"Searches through all sections under a faculty using emp_no"
								Expects:
									{
										emp_no: (int),
										email_add: (string)
									}
								Returns:
									[
										{
											emp_no: (int),
											course_name: (string),
											course_title: (string),
											description: (string),
											section: (string),
											section_type: (int),
											day: (string),
											time_start: (string),
											time_end: (string),
											room: (string),
											no_of_students: (int),
											acad_year: (int),
											semester: (int),
											unit: (int),
											max_capacity: (int),
											status: (string)
										}
									]
	view_all_active_faculty_members
								Description:
									"Returns all faculty that are Active"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
										  emp_no: (int)
										  name: (string)
										  email_add: (string)
										  status: (string)
										  isRegCom: (int)
										}
									]
	search_faculty_via_emp_no
								Description:
									"Searches through all faculty using emp_no"
								Expects:
									{
										emp_no: (int),
										email_add: (string)
									}
								Returns:
									{
									  emp_no: (int),
									  name: (string),
									  email_add: (string),
									  status: (string),
									  isRegCom: (int)
									}
	view_all_room_assignment
								Description:
									"Returns all room assignments"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											room: (string),
											time_start: (string),
											time_end: (string),
											name: (string)
										}
									]
	search_room_assignment
								Description:
									"Searches through room assignments via room name"
								Expects:
									{
										room: (string),
										email_add: (string)
									}
								Returns:
									[
										{
											room: (string),
											time_start: (string),
											time_end: (string),
											name: (string)
										}
									]
	view_all_adviser_advisee_assignment
								Description:
									"Returns all adviser-advisee information"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											adviser_advisee_id: (int),
											student_number: (int),
											student_name: (string),
											emp_no: (int),
											faculty_name: (string),
											status:(string)
										}
									]
	view_senior_junior_faculty
								Description:
									"Returns a list of the senior-junior relationship"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											sr_name:(string),
											jr_name:(string)
										}
									]
	view_all_active_courses
								Description:
									"Returns a list of all courses that have sections that are either Active, Petitioned, or Additional"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											course_id: (int),
											course_name: (string),
											course_title: (string)
										}
									]
	view_available_courses_with_unassigned_sections
								Description:
									"Returns a list of courses with existing unassigned sections"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											course_id: (int),
											course_name: (string),
											course_title: (string)
										}
									]
	search_all_unassigned_sections_via_course_id
								Description:
									"Searches through all sections without an assigned faculty"
								Expects:
									{
										course_id: (int),
										email_add: (string)
									}
								Returns:
									[
										{
											course_offering_id:(int),
											course_id:(int),
											course_name:(string),
											course_title:(string),
											description:(string),
											acad_year:(int),
											semester:(int),
											time_start:(string),
											time_end:(string),
											room:(string),
											no_of_students:(int),
											unit:(int),
											day:(int),
											section:(string),
											section_type:(int),
											max_capacity:(int),
											emp_no:(int),
											status: (string)
										}
									]
	search_active_faculty_members_via_name
								Description:
									"Searches through all faculty members that are Active via name"
								Expects:
									{
										name: (int),
										email_add: (string)
									}
								Returns:
									[
										{
										  emp_no: (int),
										  name: (string),
										  email_add: (string),
										  status: (string),
										  isRegCom: (int)
										}
									]

	view_existing_courses
								Description:
									"Returns all existing courses in the database"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									{
									  course_id: (int),
									  course_name: (string),
									  course_title: (string),
									  description: (string)
									}


	view_all_adviser
								Description:
									"Returns all advisers from faculty"
								Expects:
									{
										email_add: (string)
									}
								Returns:
									[
										{
											adviser_advisee_id: (int),
											emp_no: (int),
											faculty_name: (string),
											adviser_advisee_status: (string)
										}
									]


	create_course
								Description:
									"Creates a new course"
								Expects:
									[
										{
											course_name:(string),
											course_title:(string),
											description:(string)
										}
									]
	create_lab_section
								Description:
									"Creates a lab section"
								Expects:
									[
										{
											acad_year: (int),
											semester: (int),
											time_start: (string),
											time_end: (string),
											room: (string),
											no_of_students: (int),
											unit: (int),
											day: (int),
											section: (string),
											max_capacity: (int),
											course_id: (int),
											emp_no: (int),
											status: (string)
										}
									]
	create_section
								Description:
									"Creates a lab/lecture section"
								Expects:
									[
										{
											acad_year: (int),
											semester: (string),
											time_start: (string),
											time_end: (string),
											room: (string),
											no_of_students: (int),
											day: (int),
											section: (string),
											section_type: (int),
											max_capacity: (int),
											course_id: (int),
											emp_no: (int),
										}
									]
	modify_section
								Description:
									"Modifies a section"
								Expects:
									[
										{
											acad_year: (int),
											semester: (int),
											time_start: (string),
											time_end: (string),
											room: (string),
											no_of_students: (int),
											day: (int),
											section: (string),
											section_type: (int),
											max_capacity: (int),
											emp_no: (int),
											status: (string),
											course_offering_id: (int)
										}
									]
	unassign_section
								Description:
									"Unassigns faculty from a section"
								Expects:
									[
										{
											course_offering_id: (int)
										}
									]
	assign_section
								Description:
									"Assigns faculty to a section"
								Expects:
									[
										{
											emp_no: (int),
											course_offering_id: (int)
										}
									]
	remove_regcom
								Description:
									"Removes regcom privileges from faculty"
								Expects:
									[
										{
											emp_no: (int)
										}
									]
}

export default SocketRoutes;
